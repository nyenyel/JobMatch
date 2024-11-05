import React, { useContext, useEffect, useState } from 'react'
import Redirect, { AdminRedirect, ApplicantRedirect, RoleCheck } from '../context/Redirect'
import EmployerProfileSummary from '../cards/EmployerProfileSummary'
import JobInformation from '../cards/JobInformation'
import { AppContext } from '../context/AppContext'
import { NavLink } from 'react-router-dom'
import Loading from '../cards/Loading'
import { crud } from '../resource/api'
import ApplicantInformation from '../cards/ApplicantInformation'
import JobApplication from '../cards/JobApplication'
import EmployerApplicantCard from '../cards/EmployerApplicantCard'

export default function EmployerApplicant() {
    const {apiClient, user} = useContext(AppContext)
    const [data,setData] = useState()
    const [loading,setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)
        try{
            const response = await apiClient.get(crud.concat('my-applicant'))
            setData(response.data)
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const getShortListed = async () => {
        setLoading(true)
        try{
            const response = await apiClient.get(crud.concat('short-listed-applicant'))
            setData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
        {loading && <Loading />}

        <Redirect />
        <AdminRedirect />
        <ApplicantRedirect />
        <div className='flex'>
        <div className='sticky h-full top-0'>
            <EmployerProfileSummary  data={user}/>
        </div>
        <div className='flex-1 ml-3 w-full'>
            <div>
                <div className='flex gap-2 mb-2'>
                    <div onClick={getShortListed} className='flex-none text-sm content-center border-2 border-prc px-2 text-prc rounded-full cursor-pointer hover:bg-white hover:bg-opacity-35'>Short List</div>
                    <div className='bg-black w-full h-0.5 bg-opacity-20 rounded-full my-3'></div>
                </div>
                {data?.map((item,index) => (
                    <EmployerApplicantCard key={index} data={item}/>
                ))}
                </div>
            </div>
        </div>
        </>
    )
}
