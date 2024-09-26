import React from 'react'
import Skill from './Skill'

export default function CompanyInformation({data}) {
  console.log(data)
  return (
    <>
    <div className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'>
        <div className=' flex-1'>
            <div className='font-bold text-xl'>{data?.title}</div>
            <div className='font-base text-sm'>Owner: {data.owner?.last_name}, {data.owner?.first_name}</div>
            <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
            <div className='font-bold text-sm'>Description</div>
            <div className='font-base text-sm mb-2'>{data?.desc}</div>
            
        </div>
        <div className="flex-none  flex flex-col items-center justify-center p-4">
          <div className="text-center text-4xl mb-2 font-bold flex">
              {data.jobs?.length == null ? (0):(data.jobs.length)}
          </div>
          <div className="text-center">Jobs</div>
        </div>
    </div>
    </>
  )
}


