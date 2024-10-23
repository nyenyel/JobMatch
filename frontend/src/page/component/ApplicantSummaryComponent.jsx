import React, { useContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Skill from '../cards/Skill'
import { Experience } from '../cards/ApplicantProfileSummary'
import axios from 'axios'
import { crud } from '../resource/api'
import { AppContext } from '../context/AppContext'

export default function ApplicantSummaryComponent() {
    const location = useLocation()
    const {apiClient} = useContext(AppContext)
    const {applicantData, applicationID} = location.state || {}
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const updateData = async (data)=> {
        setLoading(true)
        try {
            const response = await apiClient.put(crud.concat(`update-application/${applicationID}`), {lib_status_id: data},{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate('/employer/Jobs')
        } catch(error) {
            console.error(error.response)
        } finally { 
            setLoading(false)
        }
    }

    const hadnleSubmit = (des) => {updateData(des)}

    return (
        <>   
        <div className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'>
            <div className=' flex-1'>
                <div className='font-bold text-xl'>{applicantData?.last_name}, {applicantData?.first_name}</div>
                <div className='font-base text-sm'>Profession: {applicantData?.profession?.desc}</div>
                <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
                <div className='font-bold text-sm'>Description</div>
                <div className='font-base text-sm mb-2'>{applicantData?.desc}</div>
                <div className='font-bold text-sm'>Skills</div>
                <div className='flex flex-wrap pt-1 gap-1'>
                    {applicantData?.skill?.map((item, index) => (
                        <Skill key={index} data={item} />
                    ))}
                </div>
                <div className='font-bold text-sm mt-2'>Experience</div>
                <div className='flex flex-col flex-wrap pt-1 gap-1'>
                    {applicantData?.experience?.map((item, index) => (
                        <ExperienceSummary key={index} data={item} />
                    ))}
                </div>

                <div className='flex mt-2 gap-16'>
                    <div className='flex-none'>
                        <div className='font-bold text-sm '>Address</div>
                        <div className='font-base text-sm mb-2'>{applicantData?.address}</div>
                    </div>

                    <div className='flex-none'>
                        <div className='font-bold text-sm'>E-mail</div>
                        <div className='font-base text-sm mb-2'>{applicantData?.email}</div>
                    </div>

                    <div className='flex-none'>
                        <div className='font-bold text-sm'>Contact No.</div>
                        <div className='font-base text-sm mb-2'>{applicantData?.phone_no}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex gap-2 text-center mt-4 text-white font-bold'>
            <div onClick={() => hadnleSubmit(3)} className='flex-1 bg-red-700 rounded-md py-2 select-none cursor-pointer hover:bg-opacity-80'>Reject</div>
            <div onClick={() => hadnleSubmit(1)} className='flex-1 bg-prc rounded-md py-2 select-none cursor-pointer hover:bg-opacity-80'>Accept</div>
        </div>
        </>
    )
}

export function ExperienceSummary({data}){
    // console.log(data)
    return (
    <div className='flex'>
        <div className='w-0.5 bg-text bg-opacity-40 rounded-full mr-2 my-0.5'></div>
        <div className="flex flex-col ">
            <div className="font-semibold text-sm flex-none mr-1">{data?.title}</div>
            <div className="flex-1 text-sm">Profession: {data?.profession?.desc}</div>
            <div className="flex-1 text-sm">Duration: {data?.duration} year(s)</div>
            <div className="flex-1 text-sm">Description: {data?.desc} </div>
        </div>
    </div>
    )
}