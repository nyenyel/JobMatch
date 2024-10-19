import React, { useContext } from 'react'
import Skill from './Skill'
import { AppContext } from '../context/AppContext'
import ProfessionLevel from './ProfessionLevel'
import { NavLink } from 'react-router-dom'


export default function ApplicantJobInformation({data, user}) {
    // console.log(data)
  return (
    <NavLink 
        to={`${data?.job?.id}`} 
        state={{ 
            jobData: data?.job, 
            percentage: data?.percentage,
            user: user
        }}
        className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'
    >
        <div className=' flex-1'>
            <div className='font-bold text-xl'>{data?.job?.title}</div>
            <div className='font-base text-sm'>Duration untill: {data?.job?.post_duration}</div>
            <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
            <div className='font-bold text-sm'>Description</div>
            <div className='font-base text-sm mb-2'>{data?.job?.desc}</div>
            <div className='font-bold text-sm'>Requirements</div>
            <div className='flex flex-wrap pt-1 gap-1 mb-2'>
                <ProfessionLevel data={data?.job?.level?.desc}/>
                {data?.job?.skill.map((item, index) => (
                  <Skill key={index} data={item}/>
                ))}
            </div>
        </div>
        <div className="flex-none  flex flex-col items-center justify-center p-4">
            <div className="text-center text-4xl mb-2 font-bold flex">{data?.percentage}<div className='text-sm'>%</div></div>
            <div className="text-center">Match</div>
        </div>
    </NavLink>
  )
}
