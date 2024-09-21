import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate, Outlet } from 'react-router-dom'
import TopBar from '../component/TopBar'

export default function AdminModule() {
    const {token, role} = useContext(AppContext)
    const links =  ['Message','Accounts', 'Verify']
    return (
        <>
            {token == null && (
                <>
                <Navigate to={'/login'} replace={true} />
                {role == null ? (
                    <Navigate to={'/login'} replace={true} />
                ) : (
                    <>
                    {role != null && (
                        <Navigate to={`/${role}`} replace={true} />
                    )}
                    </>
                )}
                </>
            )}
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
