import React, { useContext } from 'react'
import Redirect, { AdminRedirect, EmployerRedirect } from '../context/Redirect'
import ApplicantProfileSummary from '../cards/ApplicantProfileSummary'
import JobInformation from '../cards/JobInformation'
import { AppContext } from '../context/AppContext'
import JobApplication from '../cards/JobApplication'

export default function ApplicationComponent() {
  const {user} = useContext(AppContext)
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
          {user?.data?.application?.map((item, index) => (
            <JobApplication isApplication={true} data={item?.job} status={item?.status} key={index}/>
          ))}

        </div>
      </div>
    </div>
    </>
  )
}
