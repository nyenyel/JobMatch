import React, { useContext } from 'react'
import Redirect, { AdminRedirect, ApplicantRedirect } from '../context/Redirect'
import EmployerProfileSummary from '../cards/EmployerProfileSummary'
import JobInformation from '../cards/JobInformation'
import ApplicantInformation from '../cards/ApplicantInformation'
import ApplicantProfileSummary from '../cards/ApplicantProfileSummary'
import { AppContext } from '../context/AppContext'
import { useOutletContext } from 'react-router-dom'

export default function ApplicantConmponent() {
    const {user} = useContext(AppContext)
    const data = useOutletContext()
    return (
    <>
    <Redirect />
    <AdminRedirect />
    <ApplicantRedirect/>
    
    <ApplicantInformation />
    <ApplicantInformation />
    <ApplicantInformation />
    <ApplicantInformation />
    <ApplicantInformation />
    <ApplicantInformation />
    <ApplicantInformation />

    </>
  )
}
