import React from 'react'
import Skill from './Skill'
import { NavLink } from 'react-router-dom'

export default function ApplicantInformation({data}) {
    const applicant = data?.applicant
    return (
    <>
    <NavLink 
        to={`${applicant?.username}`} 
        state={{
            applicantData: data?.applicant,
            applicationID: data?.id
        }} 
        className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'
    >
        <div className=' flex-1'>
            <div className='font-bold text-xl'>{applicant?.last_name}, {applicant?.first_name}</div>
            <div className='font-base text-sm'>Profession: {applicant?.profession?.desc}</div>
            <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
            <div className='font-bold text-sm'>Description</div>
            <div className='font-base text-sm mb-2'>{applicant?.desc}</div>
            <div className='font-bold text-sm'>Skills</div>
            <div className='flex flex-wrap pt-1 gap-1'>
                {applicant?.skill?.map((item, index) => (
                    <Skill key={index} data={item} />
                ))}
            </div>
        </div>
    </NavLink>
    </>
  )
}
