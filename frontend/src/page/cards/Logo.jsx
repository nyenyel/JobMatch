import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import icon from '../../assets/icon.png'
import { AppContext } from '../context/AppContext'

export default function Logo() {
  return (
    <div className=' flex'>
        <Badge/>
        {/* <div className='ml-2 flex-none mt-0.5'>
            <div className='h-1 rounded-full bg-prc'></div>
            <div className='mt-1 flex'>
                <div className='h-4 w-4 rounded-full bg-prc z-50'></div>
                <div className='h-4 w-4 rounded-full bg-white border-3 -ml-1.5 border-prc z-40'></div>
                <div className='h-4 w-4 r0-ounded-full bg-prc -ml-1.5 z-30'></div>
                <div className='h-4 w-4 rounded-full bg-white border-3 -ml-1.5 border-prc z-20'></div>
                <div className='h-4 w-4 rounded-full bg-prc -ml-1.5 z-10'></div>
            </div>
        <div className='font-extrabold text-prc select-none'>Job-Matching</div>
      </div> */}
    </div>
  )
}

export function Badge(){
    const {role} = useContext(AppContext)
    const currentRole = role ? `/${role}` : '/';
    return (
    <NavLink to={`${currentRole}`} className=' select-none flex-none font-extrabold text-white rounded-lg'>
            <img src={`${icon}`} className='h-12 m-3' ></img>
    </NavLink>
    )
}