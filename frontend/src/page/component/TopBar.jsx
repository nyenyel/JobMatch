import React from 'react'
import Logo from '../cards/Logo'
import { NavLink } from 'react-router-dom'

export default function TopBar({links}) {
  return (
    <div className='px-5 bg-white flex'>
      <div className='py-3 flex-1'>
        <Logo />
      </div>
      <div className=' flex mr-4'>
      {links.map((item, index) => (
        <NavLink key={index} to={item} 
          className={({ isActive }) => {
            return `content-center px-8 ${isActive ? 'border-b-4 border-prc font-bold text-prc': ''}`
          }}>
          {item}
        </NavLink>
      ))}
      </div>
      <div className='flex h-auto items-center justify-center'>
        <div className='bg-black cursor-pointer bg-opacity-20 w-11 h-11 ml-6 rounded-full'></div>
      </div>
    </div>
  )
}
