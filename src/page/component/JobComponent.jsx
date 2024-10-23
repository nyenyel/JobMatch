import React, { useContext, useEffect } from 'react'
import Redirect, { AdminRedirect, ApplicantRedirect, RoleCheck } from '../context/Redirect'
import EmployerProfileSummary from '../cards/EmployerProfileSummary'
import JobInformation from '../cards/JobInformation'
import { AppContext } from '../context/AppContext'
import { NavLink } from 'react-router-dom'

export default function JobComponent() {
  const {user} = useContext(AppContext)
  // console.log(user)
  return (
    <>
    <Redirect />
    <AdminRedirect />
    <ApplicantRedirect />
    <div className='flex'>
      <div className='sticky h-full top-0'>
        <EmployerProfileSummary  data={user}/>
      </div>
      <div className='flex-1 ml-3 w-full'>
        <div>
          <NavLink to={'new-job-post'} className='p-4 bg-white rounded-lg flex hover:bg-white hover:bg-opacity-70 cursor-pointer'>
            <div className=' rounded-full h-10 w-10 bg-text mr-2'></div>
            <div className=' rounded-full h-10 w-full border-2 border-text content-center px-4 text-sm border-opacity-65 font-bold text-text text-opacity-50'>
            Start a job post for your company/business, try recruiting someone
            </div>
          </NavLink>
          <div className='bg-black w-full h-0.5 bg-opacity-20 rounded-full my-3'></div>
          {user?.data.jobs.map((item,index) => (
            <JobInformation key={index} data={item}/>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
