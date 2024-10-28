import React from 'react'

export default function EmployerProfileSummary({data}) {
    const user = data?.data
  return (
    <div className=' w-72 rounded-lg h-full flex-none pb-4 drop-shadow-sm bg-white'>
        <div className='bg-prc w-full min-h-20 rounded-t-lg'></div>
        <div className=' px-4 -mt-9 text-text'>
            <div className=' w-16 h-16 bg-text rounded-full border-2 border-white' style={{
                backgroundImage: `url(${user?.image})`,
                backgroundSize: 'cover', // Optional: Make the image cover the entire div
                backgroundPosition: 'center', // Optional: Center the image
              }}></div>
            <div className='mt-2 font-bold text-xl'>{user?.last_name}, {user?.first_name}</div>
            <div className=' font-normal text-sm'>Employer</div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm'>My Rating</div>
            <div className='flex'>
                {user?.rating}★
            </div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm mb-1'>My Company/Business</div>
            <div>
                {user?.company.map((item, index) => (
                    <Company key={index} data={item}/>
                ))}
            </div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm mb-1'>Decription</div>
            <div className=' font-bold'>
               {user?.desc}
            </div>
        </div>
    </div>
  )
}

export function Company({data}){
    return (
    <div className=' flex'>
        <div className='font-bold flex-1'> {data?.title}</div>
        {/* <div className='underline text-xs content-center cursor-pointer'>Edit</div> */}
    </div>
    )
}