import React from 'react'

export default function EmployerProfileSummary() {
  return (
    <div className=' w-72 rounded-lg h-full flex-none pb-4 drop-shadow-sm bg-white'>
        <div className='bg-prc w-full min-h-20 rounded-t-lg'></div>
        <div className=' px-4 -mt-9 text-text'>
            <div className=' w-16 h-16 bg-text rounded-full border-2 border-white'></div>
            <div className='mt-2 font-bold text-xl'>Full, Name A.</div>
            <div className=' font-normal text-sm'>Employer</div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm'>My Rating</div>
            <div className='flex'>
                <div>*</div>
                <div>*</div>
                <div>*</div>
                <div>*</div>
                <div>*</div>
            </div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm mb-1'>My Company/Business</div>
            <div>
                <Company data={1}/>
                <Company data={2} />
                <Company data={3}  />
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

export function Company({data}){
    return (
    <div className=' flex'>
        <div className='font-bold flex-1'>Company {data}</div>
        <div className='underline text-xs content-center cursor-pointer'>Edit</div>
    </div>
    )
}