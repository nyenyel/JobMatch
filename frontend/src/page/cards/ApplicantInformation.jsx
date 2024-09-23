import React from 'react'
import Skill from './Skill'

export default function ApplicantInformation() {
  return (
    <>
    <div className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'>
        <div className=' flex-1'>
            <div className='font-bold text-xl'>Full, Name A.</div>
            <div className='font-base text-sm'>Applicant from: Job title</div>
            <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
            <div className='font-bold text-sm'>Description</div>
            <div className='font-base text-sm mb-2'>Another description for the employers job post.</div>
            <div className='font-bold text-sm'>Requirements</div>
            <div className='flex flex-wrap pt-1 gap-1'>
                <Skill />
                <Skill />
                <Skill />
                <Skill />
                <Skill />
                <Skill />
                <Skill />
                <Skill />
                <Skill />
                <Skill />
                <Skill />
                <Skill />
            </div>
        </div>
        <div className="flex-none  flex flex-col items-center justify-center p-4">
            <div className="text-center text-4xl mb-2 font-bold flex">
                12
                <div className='text-sm'>%</div>
            </div>
            <div className="text-center">Match</div>
        </div>
    </div>
    </>
  )
}
