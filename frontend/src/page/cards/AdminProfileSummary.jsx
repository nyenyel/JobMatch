import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'

export default function AdminProfileSummary() {
    const {user} = useContext(AppContext)


    return (
    <>
    <div className='flex bg-white p-5 rounded-md text-text  hover:bg-white hover:bg-opacity-80'>
        <div className='w-20 h-20 rounded-full bg-dirty mr-5'
            style={{
                backgroundImage: `url(${user?.data?.image})`,
                backgroundSize: 'cover', // Optional: Make the image cover the entire div
                backgroundPosition: 'center', // Optional: Center the image
              }}></div>
        <div className=' content-center'>
            <div className=' font-bold text-2xl'>{user?.data?.last_name}, {user?.data?.first_name}</div>
            <div className=' -mt-1 font-medium'>{user?.data?.email}</div>
            <div className=' -mt-1 font-medium'>{user?.data?.phone_no}</div>
        </div>
    </div>
    </>
    )
}
