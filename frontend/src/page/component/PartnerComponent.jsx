import React, { useEffect, useState } from 'react'
import Redirect, { ApplicantRedirect, EmployerRedirect } from '../context/Redirect'
import CompanyInformation from '../cards/CompanyInformation'
import PartnerInformation from '../cards/PartnerInformation'
import axios from 'axios'
import { crud } from '../resource/api'
import Loading from '../cards/Loading'

export default function PartnerComponent() {
    const [ loading ,setLoading] = useState (false)
    const [data ,setData] = useState()
    useEffect(() => {
        setLoading(true)
        const getData = async (e) => {
            try{

                const response = await axios.get(crud.concat('company'))
                setData(response.data.data)
            } catch (e) {
                console.log('Error: ', e)
            }finally {
                setLoading(false)
            }
        }
        getData()
    }, [])
    return (
    <>
    <Redirect />
    <EmployerRedirect />
    <ApplicantRedirect />
    {loading && (<Loading/>)}
    <div>
        <div className=' text-2xl font-bold text-text mb-2'> Company</div>
        <div className="grid grid-cols-4 gap-2">
            {data?.map((item ,index) => (
            <PartnerInformation key={index} data={item}/> 
            ))}
        </div>
    </div>
    </>
    )
}
