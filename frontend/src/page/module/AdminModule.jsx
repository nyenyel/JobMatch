import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate, Outlet } from 'react-router-dom'
import TopBar from '../component/TopBar'
import Redirect, { RoleCheck } from '../context/Redirect'

export default function AdminModule() {
    const {token, role} = useContext(AppContext)
    const links =  ['Dashboard', 'Accounts','Verify', 'Partner', 'Profession']
    return (
        <>
            <Redirect />
            <RoleCheck />
            <div className='flex flex-col'>
                <div className=''>
                    <TopBar links={links} />
                </div>
                <div className='mt-3 mx-5'>
                <Outlet />
                </div>
            </div>
        </>
    )
}
