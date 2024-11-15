import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Warning({message}) {
  return (
    <div className='mb-2 flex items-center bg-red-800 bg-opacity-30 text-white rounded-md p-3'>
        <div className='icon-[ic--round-warning] bg-white w-5 h-5 flex items-center justify-center mr-2'></div>
        {message}
    </div>
  )
}

export function Success({message}) {
  return (
    <div className='sticky top-0 mb-2 flex items-center bg-green-800 bg-opacity-90 text-white rounded-md p-3'>
        <div className='icon-[ic--round-warning] bg-white w-5 h-5 flex items-center justify-center mr-2'></div>
        {message}
    </div>
  )
}
