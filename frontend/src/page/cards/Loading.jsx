import React from 'react'

export default function Loading() {
  return (
    <div className=" z-50 bg-black w-screen h-screen absolute top-0 left-0 bg-opacity-10 flex justify-center items-center">
      <div className="animate-spin w-5 h-5 p-5 rounded-lg bg-prc">
        <div className='animate-reverse-spin rounded-lg bg-white p-3'></div>
      </div>
    </div>
  )
}
