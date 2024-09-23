import React from 'react'
import Skill from './Skill'

export default function ApplicantProfileSummary() {
  return (
    <div className=' w-72 rounded-lg h-full flex-none pb-4 drop-shadow-sm bg-white'>
        <div className='bg-prc w-full min-h-20 rounded-t-lg'></div>
        <div className=' px-4 -mt-9 text-text'>
            <div className=' w-16 h-16 bg-text rounded-full border-2 border-white'></div>
            <div className='mt-2 font-bold text-xl'>Full, Name A.</div>
            <div className=' font-normal text-sm'>Applicant</div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm mb-1'>My Skills</div>
            <div className='flex flex-wrap gap-1'>
                <Skill />
                <Skill />
                <Skill />
                <Skill />
                <Skill />
            </div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm mb-1'>My Company/Business</div>
            <div>
            <Experience data={1}/>
            <Experience data={1}/>
            <Experience data={1}/>
            <Experience data={1}/>

            </div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm mb-1'>Decription</div>
            <div className=' font-bold'>A section for describing the current 
            employers on his/her own words.</div>
        </div>
    </div>
  )
}

export function Experience({data}){
    return (
    <div className=' flex mb-0.5'>
        <div className='font-bold flex-none mr-1'>Experience {data}:</div>
        <div className=' flex-1'>Company {data}</div>

        <div className='underline text-xs content-center cursor-pointer'>Edit</div>
    </div>
    )
}