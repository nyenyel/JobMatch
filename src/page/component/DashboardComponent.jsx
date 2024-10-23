import React, { useContext, useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { ruleBased } from '../resource/api';
export default function DashboardComponent() {
    const {token , apiClient} = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const dummy = { id: 0, value: 1, label: 'dummy' };
    const [jobApplicant, setJobApplicant] = useState([dummy])
    const [userLocation, setUserLocation] = useState([dummy])
    const [capasApplicant, setCapasApplicant] = useState([dummy])
    const [company, setCompany] = useState([dummy])
    const [userCount,setUserCount] = useState([dummy])
    const getData = async () => {
        setLoading(true)
        try {
            const response = await apiClient.get(ruleBased.concat('dashboard'), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            setUserLocation([
                { id: 0, value: response?.data?.userLocation?.bamban, label: `Bamban: ${response?.data?.userLocation?.bamban}` },
                { id: 1, value: response?.data?.userLocation?.capas, label: `Capas: ${response?.data?.userLocation?.capas}` },
                { id: 2, value: response?.data?.userLocation?.concception, label: `Conception: ${response?.data?.userLocation?.conception}` },
                { id: 3, value: response?.data?.userLocation?.gerona, label: `Gerona: ${response?.data?.userLocation?.gerona}` },
                { id: 4, value: response?.data?.userLocation?.tarlac, label: `Paniqui: ${response?.data?.userLocation?.paniqui}` },
            ])
            setJobApplicant([
                { id: 0, value: response?.data?.jobApplicant?.accepted, label: `Accepted: ${response?.data?.jobApplicant?.accepted}` },
                { id: 1, value: response?.data?.jobApplicant?.rejected, label: `Rejected: ${response?.data?.jobApplicant?.rejected}` },
                { id: 2, value: response?.data?.jobApplicant?.pending, label: `Pending: ${response?.data?.jobApplicant?.pending}` },
            ])
            setCapasApplicant([
                { id: 0, value: response?.data?.capasApplicant?.accepted[0]?.job_application.length, label: `Accepted: ${response?.data?.capasApplicant?.accepted[0]?.job_application.length}` },
                { id: 1, value: response?.data?.capasApplicant?.rejected[0]?.job_application.length, label: `Rejected: ${response?.data?.capasApplicant?.rejected[0]?.job_application.length}` },
                { id: 2, value: response?.data?.capasApplicant?.pending[0]?.job_application.length, label: `Pending: ${response?.data?.capasApplicant?.pending[0]?.job_application.length}` },
            ])
            setCompany([
                { id: 0, value: response?.data?.company?.verify, label: `Verified: ${response?.data?.company?.verify}` },
                { id: 1, value: response?.data?.company?.notVerified, label: `Not Verified: ${response?.data?.company?.notVerified}` },
            ])
            setUserCount([
                { id: 0, value: response?.data?.user?.employer, label: `Employer: ${response?.data?.user?.employer}` },
                { id: 1, value: response?.data?.user?.applicant, label: `Applicant: ${response?.data?.user?.applicant}` },
            ])
            console.log(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [token])
    return (
        <>
        <div className='flex gap-2'>
            <div className='flex-1 bg-white w-auto rounded-md drop-shadow p-4'>
                <div className='text-2xl font-bold text-prc'>Job Applicants</div>
                <div className='bg-prc h-0.5 mt-1 rounded-full w-72'/>
                <PieChart
                    series={[
                        {
                            data: jobApplicant,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -55,
                            endAngle: 225,  
                            cx: 100,
                            cy: 120,
                        },
                        
                    ]}
                    width={400}
                    height={250}
                />
            </div>
            <div className='flex-1 bg-white w-auto rounded-md drop-shadow p-4'>
                <div className='text-2xl font-bold text-prc'>User Location</div>
                <div className='bg-prc h-0.5 mt-1 rounded-full w-72'/>
                <PieChart
                    series={[
                        {
                            data: userLocation,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -55,
                            endAngle: 225,
                            cx: 100,
                            cy: 120,
                        },
                        
                    ]}
                    width={400}
                    height={250}
                />
            </div>
            <div className='flex-1 bg-white w-auto rounded-md drop-shadow p-4'>
                <div className='text-2xl font-bold text-prc'>Applicant in Capas</div>
                <div className='bg-prc h-0.5 mt-1 rounded-full w-72'/>
                <PieChart
                    series={[
                        {
                            data: capasApplicant,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -55,
                            endAngle: 225,
                            cx: 100,
                            cy: 120,
                        },
                        
                    ]}
                    width={400}
                    height={250}
                />
            </div>
        </div>
        <div className='mt-2 flex gap-2'>
            <div className='flex-1 bg-white w-auto rounded-md drop-shadow p-4'>
                <div className='text-2xl font-bold text-prc'>Employer Companies</div>
                <div className='bg-prc h-0.5 mt-1 rounded-full w-72'/>
                <PieChart
                    series={[
                        {
                            data: company,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -55,
                            endAngle: 225,
                            cx: 100,
                            cy: 120,
                        },
                        
                    ]}
                    width={400}
                    height={250}
                    />
            </div>
            <div className='flex-1 bg-white w-auto rounded-md drop-shadow p-4'>
                <div className='text-2xl font-bold text-prc'>Users</div>
                <div className='bg-prc h-0.5 mt-1 rounded-full w-72'/>
                <PieChart
                    series={[
                        {
                            data: userCount,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -55,
                            endAngle: 225,
                            cx: 100,
                            cy: 120,
                        },
                        
                    ]}
                    width={400}
                    height={250}
                    />
            </div>
        </div>
        </>
    )
}
