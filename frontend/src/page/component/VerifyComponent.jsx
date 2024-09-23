import React from 'react'
import Redirect, { ApplicantRedirect, EmployerRedirect } from '../context/Redirect'

export default function VerifyComponent() {
  return (
    <>
    <Redirect />
    <EmployerRedirect />
    <ApplicantRedirect />
    <div>VerifyComponent</div>
    </>
  )
}
