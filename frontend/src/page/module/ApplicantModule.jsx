import React, { useState } from 'react'
import { AppContext } from '../context/AppContext'
import Redirect, { AdminRedirect, ApplicantRedirect } from '../context/Redirect'
import TopBar from '../component/TopBar'
import { Outlet } from 'react-router-dom'

export default function ApplicantModule() {
    const {token, role} = useState(AppContext)
    const links = ['Jobs', 'Application', 'Skill', 'Experience', 'Search']
  return (
    <>
    <Redirect />
    <AdminRedirect />
    <ApplicantRedirect />
    <div>
      <div className='flex flex-col'>
          <div className=''>
              <TopBar links={links} />
          </div>
          <div className='mt-3 mx-5'>
            <Outlet />
          </div>
      </div>
    </div>
    </>
  )
}
