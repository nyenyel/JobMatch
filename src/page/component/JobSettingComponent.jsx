import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Redirect, { AdminRedirect, ApplicantRedirect } from '../context/Redirect'
import EmployerProfileSummary from '../cards/EmployerProfileSummary'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { SettingTopBar } from './TopBar'
import axios from 'axios'
import { crud } from '../resource/api'
import Loading from '../cards/Loading'

export default function JobSettingComponent() {
    const {user , apiClient} =useContext(AppContext)
    const {jobID} = useParams()
    const [laoding, setLoading] =useState(false)
    const [data, setData] =useState()
    const links = ['Applicant','Skill', 'Modify']
    useEffect (() => {
        setLoading(true)
        const getData = async () => {
            try {
                const response = await apiClient.get(crud.concat(`job/${jobID}`))
                setData(response.data.data)
            } catch (e){
                console.log("error", e)
            } finally{
                setLoading(false)
            }
        }
        getData()
    }, [])
    return (
    <>
        {laoding && (<Loading />)}
        <Redirect />
        <AdminRedirect />
        <ApplicantRedirect />
        <div className='flex'>
            <div className='sticky h-full top-0'>
                <EmployerProfileSummary  data={user}/>
            </div>
            <div className='flex-1 ml-3 w-full'>
                <div>
                    <SettingTopBar links={links}/>
                    <div className='bg-black w-full h-0.5 bg-opacity-20 rounded-full mb-2 -mt-0.5'></div>
                    <Outlet context={data}/>
                </div>
            </div>
        </div>
    </>
    )
}
