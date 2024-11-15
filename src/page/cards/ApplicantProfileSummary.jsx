import React, { useContext } from 'react'
import Skill from './Skill'
import { AppContext } from '../context/AppContext'

export default function ApplicantProfileSummary() {
    const {user} = useContext(AppContext)
  return (
    <div className=' w-72 rounded-lg h-full flex-none pb-4 drop-shadow-sm bg-white max-[1100px]:hidden'>
        <div className='bg-prc w-full min-h-20 rounded-t-lg'></div>
        <div className=' px-4 -mt-9 text-text'>
            <div className=' w-16 h-16 bg-text rounded-full border-2 border-white'
                style={{
                    backgroundImage: `url(${user?.data.image})`,
                    backgroundSize: 'cover', // Optional: Make the image cover the entire div
                    backgroundPosition: 'center', // Optional: Center the image
                  }}></div>
            <div className='mt-2 font-bold text-xl'>{user?.data?.last_name}, {user?.data?.first_name} </div>
            <div className=' font-normal text-sm'>Applicant</div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm mb-1'>My Skills</div>
            <div className='flex flex-wrap gap-1'>
                {user?.data?.skill?.slice(0, 10).map((item,index) => ( 
                    <Skill key={index} data={item} />
                ))}
            </div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm mb-1'>My Experience:</div>
            <div>
            {user?.data?.experience?.map((item, index) => (
                <Experience data={item} key={index} />
            ))}
            </div>
        </div>
        <div className='bg-black w-full h-0.5 bg-opacity-5 rounded-full my-3'></div>
        <div className=' px-4 text-text'>
            <div className=' font-normal text-sm mb-1'>Decription</div>
            <div className=' font-bold'>{user?.data.desc}</div>
        </div>
    </div>
  )
}

export function Experience({data}){
    return (
    <div className="flex flex-col mb-2 ">
        <div className="font-bold flex-none mr-1">{data?.title}</div>
        <div className="flex-1"><li>{data?.profession?.desc}</li></div>
        <div className="bg-text bg-opacity-10 h-0.5 w-full"></div>
        {/* <div className='underline text-xs content-center cursor-pointer'>Edit</div> */}
    </div>
    )
}