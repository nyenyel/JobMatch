import React, { useContext } from 'react'
import Skill from './Skill'
import { AppContext } from '../context/AppContext'

export default function JobInformation({isApplication = false}) {
  const {role} = useContext(AppContext)
  return (
    <>
    <div className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'>
        <div className=' flex-1'>
            <div className='font-bold text-xl'>Job Title</div>
            <div className='font-base text-sm'>Duration: March 10, 2000 - March 11, 2000</div>
            <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
            <div className='font-bold text-sm'>Description</div>
            <div className='font-base text-sm mb-2'>Another description for the employers job post.</div>
            <div className='font-bold text-sm'>Requirements</div>
            <div className='flex flex-wrap pt-1 gap-1 mb-2'>
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
            {isApplication && (
              <>
              <div className='font-bold text-sm'>Status</div>
              <div className='font-base text-sm mb-2'>Rejected</div>
              </>
            )}
        </div>
        {role == 'Applicant' ? (
          <div className="flex-none  flex flex-col items-center justify-center p-4">
            <div className="text-center text-4xl mb-2 font-bold flex">
                12
                <div className='text-sm'>%</div>
            </div>
            <div className="text-center">Percentage</div>
          </div>
        ) : (

          <div className="flex-none  flex flex-col items-center justify-center p-4">
              <div className="text-center text-4xl mb-2 font-bold">12</div>
              <div className="text-center">Applicants</div>
          </div>
        )}
    </div>
    </>
  )
}
