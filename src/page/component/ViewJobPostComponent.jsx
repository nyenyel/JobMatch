import React, { useContext, useState } from 'react'
import Redirect, { AdminRedirect, EmployerRedirect } from '../context/Redirect'
import ApplicantProfileSummary from '../cards/ApplicantProfileSummary'
import { useLocation, useNavigate } from 'react-router-dom'
import Skill from '../cards/Skill'
import ProfessionLevel from '../cards/ProfessionLevel'
import Loading from '../cards/Loading'
import axios from 'axios'
import { crud } from '../resource/api'
import Warning from '../cards/Warning'
import { AppContext } from '../context/AppContext'

export default function ViewJobPostComponent() {
    const {apiClient} = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()
    const { jobData, percentage, user } = location.state || {}
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState()
    const data = {
        job_id: jobData?.id,
        applicant_id: user?.id,
        lib_status_id:2
    }
    // console.log(user)
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
        <div className='flex-1 flex h-full gap-2'>
            <div className='flex-1 flex flex-col h-full'>
                {message && (<Warning message={message}/>)}
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
                <button onClick={handleSubmit} className='bg-prc mt-2 rounded-md py-2 text-white font-semibold hover:scale-101 select-none'>Send Application</button>
            </div>
                
            <div className='flex flex-none flex-col h-full gap-2'>
                <div className='flex-none p-4 bg-white rounded-md h-full'>
                    <div className="flex-none  flex flex-col items-center justify-center p-4">
                        <div className="text-center text-4xl mb-2 font-bold flex">{percentage}<div className='text-sm'>%</div></div>
                        <div className="text-center">Match</div>
                    </div>
                </div>
                <div className='flex-none p-4 bg-white rounded-md h-full'>
                    <div className="flex-none  flex flex-col ">
                        <div className="">Reccomendation</div>
                        <div className=" text-4xl mb-2 font-bold flex">URL's</div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    </>
    )
}
