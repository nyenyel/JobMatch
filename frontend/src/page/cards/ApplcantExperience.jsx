import React from 'react'

export default function ApplcantExperience({data}) {
  return (
    <div className='flex-1 flex bg-white rounded-md drop-shadow-sm p-4'>
        <div className=' flex-1'>
            <div className='font-bold text-xl'>{data?.title}</div>
            <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
            <div className='font-bold text-sm'>Description</div>
            <div className='font-base text-sm mb-2'>{data?.desc}</div>
            <div className='font-bold text-sm'>Profession</div>
            <div className='flex flex-wrap pt-1 gap-1 mb-2'>{data?.profession?.desc}</div>
        </div>
        <div className="flex-none  flex flex-col items-center justify-center p-4">
            <div className="text-center text-4xl mb-2 font-bold flex">{data?.duration}<div className=' font-thin ml-1 text-sm'>years</div></div>
            <div className="text-center">Experience</div>
        </div>
    </div>
  )
}
