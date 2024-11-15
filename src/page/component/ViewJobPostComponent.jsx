import React, { useContext, useEffect, useState } from 'react'
import Redirect, { AdminRedirect, EmployerRedirect } from '../context/Redirect'
import ApplicantProfileSummary from '../cards/ApplicantProfileSummary'
import { useLocation, useNavigate } from 'react-router-dom'
import Skill from '../cards/Skill'
import ProfessionLevel from '../cards/ProfessionLevel'
import Loading from '../cards/Loading'
import axios from 'axios'
import { crud, ruleBased } from '../resource/api'
import Warning from '../cards/Warning'
import { AppContext } from '../context/AppContext'

export default function ViewJobPostComponent() {
    const {apiClient} = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()
    const { jobData, percentage, user, recommend } = location.state || {}
    const [perc, setPerc] = useState(4)
    const [recom, setRecom] = useState(recommend)
    const [accepted, setAccepted] = useState(0)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState()
    const data = {
        job_id: jobData?.id,
        applicant_id: user?.id,
        lib_status_id:2
    }
    if(percentage == 0){
        const getPercent = async () => {
            setLoading(true)
            try{
                const response = await apiClient.get(ruleBased.concat(`get-percent/${data.applicant_id}/${data.job_id}`))
                setPerc(response.data.percentage)
                setRecom(response.data.recommendation)
                setAccepted(response.data.accepted)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
                // navigate(0)
            }
        }
        useEffect(()=> {
            getPercent()
        }, [perc, location])
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const response = await apiClient.post(crud.concat('job-applicant'), data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setMessage(response.data.message)
        } catch (error) {
            if (error.response) {
              console.error('Error Response Data:', error.response.data);
              console.error('Error Response Status:', error.response.status);
              console.error('Data:', bannerForm);
            } else if (error.request) {
              console.error('Error Request:', error.request);
            } else {
              console.error('Error Message:', error.message);
            }
        } finally {
            setLoading(false)
            // navigate(0)
        }
        //   console.log(jobSkillForm)
    }

    return ( 
    <>
    <Redirect />
    <AdminRedirect />
    <EmployerRedirect />
    {loading && (<Loading />)}
    <div className='flex'>
        <div className='mr-4'>
            <ApplicantProfileSummary />
        </div>   
        
        <div className='flex-1 flex h-full gap-2 max-[800px]:flex-col'>
            <div className='flex-1 flex flex-col h-full gap-2'>
                {message && (<Warning message={message}/>)}
                <div className='flex-1 p-4 bg-white rounded-md h-full'>
                    <div className='font-bold text-xl'>{jobData?.company?.title}</div>
                    <div className='font-base text-sm'>Employer: {jobData?.employer?.last_name}, {jobData?.employer?.first_name} {jobData?.employer?.middle_name.charAt(0)}. ({jobData?.employer?.rating}★)</div>
                    <div className='font-base text-sm'>Employer accepted Applcants: {accepted}</div>
                    <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-1'></div>
                    <div className='font-bold text-sm'>Description</div>
                    <div className='font-base text-sm mb-2'>{jobData?.company?.desc}</div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col'>
                            <div className='font-bold text-sm'>Email</div>
                            <div className='font-base text-sm mb-2'>{jobData?.employer?.email}</div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='font-bold text-sm'>Phone No.</div>
                            <div className='font-base text-sm mb-2'>{jobData?.employer?.phone_no}</div>
                        </div>
                    </div>
                </div>
                <div className='flex-1 p-4 bg-white rounded-md h-full'>
                    <div className='font-bold text-xl'>{jobData?.title}</div>
                    <div className='font-base text-sm'>Duration untill: {jobData?.post_duration}</div>
                    <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
                    <div className='font-bold text-sm'>Description</div>
                    <div className='font-base text-sm mb-2'>{jobData?.desc}</div>

                    <div className='font-bold text-sm'>Requirements</div>
                    <div className='flex flex-wrap pt-1 gap-1 mb-2'>
                        <ProfessionLevel data={jobData?.level?.desc}/>
                        {jobData?.skill.map((item, index) => (
                            <Skill key={index} data={item}/>
                        ))}
                    </div>
                </div>
                {perc !=0 && <button onClick={handleSubmit} className='bg-prc mt-2 rounded-md py-2 text-white font-semibold hover:scale-101 select-none'>Send Application</button>}
                
            </div>
                
            <div className='flex flex-none flex-col h-full gap-2'>
                <div className='flex-none p-4 bg-white rounded-md h-full'>
                    <div className="flex-none  flex flex-col items-center justify-center p-4">
                        <div className="text-center text-4xl mb-2 font-bold flex">{percentage !== 0 ? percentage : perc}<div className='text-sm'>%</div></div>
                        <div className="text-center">Match</div>
                    </div>
                </div>
                <div className='flex-none p-4 bg-white rounded-md h-full'>
                    <div className="flex-none  flex flex-col ">
                        <div className="">Reccomendation</div>
                        <div className=" text-4xl mb-2 font-bold flex">URL's</div>
                        <div className='flex flex-col gap-2 max-w-72'>
                        {recom?.map((item, index) => (
                            <a href={`${item.link}`} key={index}  className='flex-none truncate text-blue-500 hover:underline'>{item.link}</a>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    </>
    )
}
