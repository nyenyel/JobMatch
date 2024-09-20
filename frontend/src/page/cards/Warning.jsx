import React from 'react'

export default function Warning({message}) {
  return (
    <div className='mb-2 flex items-center bg-red-800 bg-opacity-30 text-white rounded-md p-3'>
        <div className='icon-[ic--round-warning] bg-white w-5 h-5 flex items-center justify-center mr-2'></div>
        {message}
    </div>
  )
}
