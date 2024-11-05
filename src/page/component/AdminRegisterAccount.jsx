import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminRegisterAccount() {
  return (
    <>
    <div className='bg-white rounded-r-md py-14 px-8 text-text'>
        <div className='font-extralight text-2xl'>
            Register
        </div>
        <div className='mb-8 text-sm'>Please Select Account</div>
        <div className='flex flex-col'>
            <NavLink to={'applicant'} className='bg-prc rounded-md cursor-pointer text-white text-center py-2 mb-2 select-none'>Applicant</NavLink>
            <NavLink to={'employer'}  className='bg-src rounded-md cursor-pointer text-white text-center py-2 mb-2 select-none'>Employer</NavLink>
        </div>
    </div>
    </>
  )
}
