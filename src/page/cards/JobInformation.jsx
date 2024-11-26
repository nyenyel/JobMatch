import React, { useContext } from 'react'
import Skill from './Skill'
import { AppContext } from '../context/AppContext'
import ProfessionLevel from './ProfessionLevel'
import { NavLink } from 'react-router-dom'

export default function JobInformation({data, isNotAdmin = false}) {
  const isUnpublished = data.skill.length === 0 
  const isExpired = (data?.post_duration && new Date(data?.post_duration) < new Date());
  console.log(data)
  console.log(isUnpublished)
  return (
    
    // to={isNotAdmin ? 'login': `${data?.id}`}
    <NavLink to={isNotAdmin ? 'login': `${data?.id}`} state={{ jobID : data?.id }}  className={`${isUnpublished ? 'bg-orange-100' : 'bg-white'} relative flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer`}>
        <div className={`${!isExpired && 'hidden'} absolute inset-0 bg-red-800 bg-opacity-20 rounded-md flex items-center justify-center z-10 pointer-events-none`}>
          <span className="text-6xl font-bold text-black text-opacity-20">Ended</span>
        </div>
        <div className=' flex-1'>
            <div className='font-bold text-xl'>{data?.title}</div>
            <div className='font-base text-sm'>Duration untill: {data?.post_duration}</div>
            <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
            <div className='font-bold text-sm'>Description</div>
            <div className='font-base text-sm mb-2'>{data?.desc}</div>
            <div className='font-bold text-sm'>Requirements</div>
            <div className='flex flex-wrap pt-1 gap-1 mb-2'>
                <ProfessionLevel data={data?.level?.desc}/>
                {data?.skill.map((item, index) => (
                  <Skill key={index} data={item}/>
                ))}
                {isUnpublished && 
                  <div className='flex-grow bg-red-600 text-white rounded-full px-5 py-1 text-xs font-bold'>
                    <div className='flex-1 content-center'>Not Publish</div>
                  </div>
                }
            </div>
        </div>
        <div className="flex-none  flex flex-col items-center justify-center p-4">
            <div className="text-center text-4xl mb-2 font-bold">{data?.application?.length}</div>
            <div className="text-center">Applicants</div>
        </div>
    </NavLink>
  )
}
