import React from 'react'
import Redirect, { AdminRedirect, EmployerRedirect } from '../context/Redirect'
import ApplicantProfileSummary from '../cards/ApplicantProfileSummary'
import JobInformation from '../cards/JobInformation'

export default function ApplicationComponent() {
    const handleChange =(e) =>{
        const {name , value} = e.target
    }
  return (
    <>
    <Redirect />
    <AdminRedirect />
    <EmployerRedirect />
    <div className='flex'>
      <div className='sticky h-full top-0'>
        <ApplicantProfileSummary />
      </div>
      <div className='flex-1 ml-3 w-full'>
        <div>
          <JobInformation isApplication={true}/>
          <JobInformation isApplication={true}/>
          <JobInformation isApplication={true}/>
          <JobInformation isApplication={true}/>          
          <JobInformation isApplication={true}/>
        </div>
      </div>
    </div>
    </>
  )
}
