import React from 'react'
import Redirect, { AdminRedirect, ApplicantRedirect } from '../context/Redirect'
import EmployerProfileSummary from '../cards/EmployerProfileSummary'
import JobInformation from '../cards/JobInformation'
import ApplicantInformation from '../cards/ApplicantInformation'
import ApplicantProfileSummary from '../cards/ApplicantProfileSummary'

export default function ApplicantConmponent() {
    const handleChange = (e) =>{
        const {name, value} = e.target
        console.log(name + value)
    }
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
            <div className='flex my-3 items-center'>
                <input 
                  type="checkbox" 
                  id="role-admin" 
                  name="match" 
                  value={1} 
                  className="hidden peer" 
                  defaultChecked 
                  onClick={handleChange} 
                  required 
                />
                <label 
                  htmlFor="role-admin" 
                  className="inline-flex items-center justify-between py-1 px-3 text-gray-500 bg-white rounded-full cursor-pointer dark:hover:text-gray-prc dark:peer-checked:text-white dark:peer-checked:bg-prc peer-checked:text-blue-600 hover:text-prc hover:bg-gray-100 dark:text-prc dark:bg-transparent dark:border-2 dark:border-prc dark:hover:bg-src dark:hover:bg-opacity-50">
                  <div className="block">
                    <div className="text-xs font-bold truncate">Match</div>
                  </div>
                </label>
                <div className='bg-black flex-1 h-0.5 bg-opacity-20 rounded-full ml-3'></div>
            </div>
            <ApplicantInformation />
            <ApplicantInformation />
            <ApplicantInformation />
            <ApplicantInformation />
            <ApplicantInformation />
            <ApplicantInformation />
            <ApplicantInformation />
        </div>
      </div>
    </div>
    </>
  )
}
