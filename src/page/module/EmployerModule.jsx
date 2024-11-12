import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate, Outlet } from 'react-router-dom'
import TopBar from '../component/TopBar'
import Redirect, { AdminRedirect, ApplicantRedirect } from '../context/Redirect'

export default function EmployerModule() {
  const {token, role} = useContext(AppContext)
  const links = ['Jobs', 'Company', 'Applicant']
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
