import React from 'react'
import Skill from './Skill'

export default function CompanyInformation() {
  return (
    <>
    <div className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'>
        <div className=' flex-1'>
            <div className='font-bold text-xl'>Company Title</div>
            <div className='font-base text-sm'>Owner name: Job title</div>
            <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
            <div className='font-bold text-sm'>Description</div>
            <div className='font-base text-sm mb-2'>Another description for the employers job post.</div>
            
        </div>
        <div className="flex-none  flex flex-col items-center justify-center p-4">
            <div className="text-center text-4xl mb-2 font-bold flex">
                12
            </div>
            <div className="text-center">Jobs</div>
        </div>
    </div>
    </>
  )
}


