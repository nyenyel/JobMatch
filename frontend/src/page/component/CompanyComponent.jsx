import React from 'react'
import Redirect, { AdminRedirect, ApplicantRedirect } from '../context/Redirect'
import EmployerProfileSummary from '../cards/EmployerProfileSummary'
import CompanyInformation from '../cards/CompanyInformation'

export default function CompanyComponent() {
  return (
    <>
    <Redirect />
    <AdminRedirect />
    <ApplicantRedirect/>
    <div className='flex'>
      <div className='sticky h-full top-0'>
        <EmployerProfileSummary />
      </div>
      <div className='flex-1 ml-3 w-full'>
        <div>
          <div className='p-4 bg-white rounded-lg flex hover:bg-white hover:bg-opacity-70 cursor-pointer'>
            <div className=' rounded-full h-10 w-10 bg-text mr-2'></div>
            <div className=' rounded-full h-10 w-full border-2 border-text content-center px-4 text-sm border-opacity-65 font-bold text-text text-opacity-50'>
            Add A Company
            </div>
          </div>
          <div className='bg-black w-full h-0.5 bg-opacity-20 rounded-full my-3'></div>
          <CompanyInformation />
          <CompanyInformation />
          <CompanyInformation />
          <CompanyInformation />
          <CompanyInformation />
          

        </div>
      </div>
    </div>
    </>
  )
}
