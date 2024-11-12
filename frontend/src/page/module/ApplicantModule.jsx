import React, { useState } from 'react'
import { AppContext } from '../context/AppContext'
import Redirect, { AdminRedirect, ApplicantRedirect } from '../context/Redirect'
import TopBar from '../component/TopBar'
import { Outlet } from 'react-router-dom'

export default function ApplicantModule() {
    const {token, role} = useState(AppContext)
    const links = ['Jobs', 'Application', 'Skill', 'Experience']
  return (
    <>
    <Redirect />
    <AdminRedirect />
    <ApplicantRedirect />
    <div className="flex flex-col h-screen">
        <div>
            <TopBar links={links} />
        </div>
        <div className="flex-grow mt-3 mx-5 overflow-auto scrollbar-hide">
            <Outlet />
        </div>
    </div>
    </>
  )
}
