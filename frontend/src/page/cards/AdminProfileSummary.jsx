import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'

export default function AdminProfileSummary() {
    const {user} = useContext(AppContext)


    return (
    <>
    <div className='flex bg-white p-5 rounded-md text-text  hover:bg-white hover:bg-opacity-80'>
        <div className='w-20 h-20 rounded-full bg-dirty mr-5'></div>
        <div className=' content-center'>
            <div className=' font-bold text-2xl'>{user?.last_name}, {user?.first_name}</div>
            <div className=' -mt-1 font-medium'>{user?.email}</div>
            <div className=' -mt-1 font-medium'>{user?.phone_no}</div>
        </div>
    </div>
    </>
    )
}
