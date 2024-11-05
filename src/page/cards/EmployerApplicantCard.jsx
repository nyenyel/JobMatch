import React from 'react'
import ProfessionLevel from './ProfessionLevel'
import Skill from './Skill'
import { NavLink, useNavigate } from 'react-router-dom'

export default function EmployerApplicantCard({data}) {
    const navigate = useNavigate()
    const directory = `/Employer/Jobs/${data?.job?.id}/applicant/${data?.applicant?.last_name}`
    const handleNav = () => {
        navigate(directory, {
            state: {
                applicantData: data?.applicant,
                applicationID: data?.id
            }
        })
    }
    return (
        <>
        <div onClick={handleNav} className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'>
            <div className=' flex-1'>
                <div className='font-bold text-xl'>{data?.applicant?.last_name}, {data?.applicant?.first_name}</div>
                <div className='font-base text-sm'>Profession: {data?.applicant?.profession?.desc}</div>
                <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
                <div className='font-bold text-sm'>Description</div>
                <div className='font-base text-sm mb-2'>{data?.applicant?.desc}</div>
                <div className='font-bold text-sm'>Requirements</div>
                <div className='flex flex-wrap pt-1 gap-1 mb-2'>
                    <ProfessionLevel data={data?.applicant?.sector}/>
                    {data?.applicant?.skill.map((item, index) => (
                    <Skill key={index} data={item}/>
                    ))}
                </div>
            </div>
            <div className="flex-none  flex flex-col items-center justify-center p-4">
                <div className="text-center text-2xl mb-2 font-bold">{data?.status?.desc}</div>
                <div className="text-center">Status</div>
            </div>
        </div>
        </>
  )
}

