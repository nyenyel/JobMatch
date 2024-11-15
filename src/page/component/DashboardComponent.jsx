import React, { useContext, useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { ruleBased } from '../resource/api';
import { BarChart } from '@mui/x-charts';
export default function DashboardComponent() {
    const {token , apiClient} = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const dummy = { id: 0, value: 1, label: 'dummy' };
    const [jobApplicant, setJobApplicant] = useState([dummy])
    const [userLocation, setUserLocation] = useState([dummy])
    const [sector, setSector] = useState([dummy])
    const [capasApplicant, setCapasApplicant] = useState([dummy])
    const [company, setCompany] = useState([dummy])
    const [userCount,setUserCount] = useState([dummy])
    const getData = async () => {
        setLoading(true)
        try {
            const response = await apiClient.get(ruleBased.concat('dashboard'))

            setUserLocation([
                    { id: 1, value: response?.data?.userLocation?.aranguren, label: `Aranguren: ${response?.data?.userLocation?.aranguren}` },
                    { id: 2, value: response?.data?.userLocation?.bueno, label: `Bueno: ${response?.data?.userLocation?.bueno}` },
                    { id: 3, value: response?.data?.userLocation?.cristo_rey, label: `Cristo Rey: ${response?.data?.userLocation?.cristo_rey}` },
                    { id: 4, value: response?.data?.userLocation?.cubcub, label: `Cubcub: ${response?.data?.userLocation?.cubcub}` },
                    { id: 5, value: response?.data?.userLocation?.cutcut_1st, label: `Cutcut 1st: ${response?.data?.userLocation?.cutcut_1st}` },
                    { id: 6, value: response?.data?.userLocation?.cutcut_2nd, label: `Cutcut 2nd: ${response?.data?.userLocation?.cutcut_2nd}` },
                    { id: 7, value: response?.data?.userLocation?.dolores, label: `Dolores: ${response?.data?.userLocation?.dolores}` },
                    { id: 8, value: response?.data?.userLocation?.estrada, label: `Estrada: ${response?.data?.userLocation?.estrada}` },
                    { id: 9, value: response?.data?.userLocation?.lawy, label: `Lawy: ${response?.data?.userLocation?.lawy}` },
                    { id: 10, value: response?.data?.userLocation?.manga, label: `Manga: ${response?.data?.userLocation?.manga}` },
                    { id: 11, value: response?.data?.userLocation?.manlapig, label: `Manlapig: ${response?.data?.userLocation?.manlapig}` },
                    { id: 12, value: response?.data?.userLocation?.maruglu, label: `Maruglu: ${response?.data?.userLocation?.maruglu}` },
                    { id: 13, value: response?.data?.userLocation?.o_donnell, label: `O'Donnell: ${response?.data?.userLocation?.o_donnell}` },
                    { id: 14, value: response?.data?.userLocation?.santa_juliana, label: `Santa Juliana: ${response?.data?.userLocation?.santa_juliana}` },
                    { id: 15, value: response?.data?.userLocation?.santa_lucia, label: `Santa Lucia: ${response?.data?.userLocation?.santa_lucia}` },
                    { id: 16, value: response?.data?.userLocation?.santa_rita, label: `Santa Rita: ${response?.data?.userLocation?.santa_rita}` },
                    { id: 17, value: response?.data?.userLocation?.santo_domingo_1st, label: `Santo Domingo 1st: ${response?.data?.userLocation?.santo_domingo_1st}` },
                    { id: 18, value: response?.data?.userLocation?.santo_domingo_2nd, label: `Santo Domingo 2nd: ${response?.data?.userLocation?.santo_domingo_2nd}` },
                    { id: 19, value: response?.data?.userLocation?.santo_rosario, label: `Santo Rosario: ${response?.data?.userLocation?.santo_rosario}` },
                    { id: 20, value: response?.data?.userLocation?.talaga, label: `Talaga: ${response?.data?.userLocation?.talaga}` },
            ])

            const dataset = userLocation.map(location => ({
                name: location.label, // This will be the name of the location as label
                value: location.value  // This will be the corresponding value
            }));
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
            setSector([
                { id: 0, value: response?.data?.sector?.educ, label: `Education: ${response?.data?.sector?.educ}` },
                { id: 1, value: response?.data?.sector?.tech, label: `Technology: ${response?.data?.sector?.tech}` },
                { id: 2, value: response?.data?.sector?.finance, label: `Finance: ${response?.data?.sector?.finance}` },
                { id: 3, value: response?.data?.sector?.healthcare, label: `Healthcare: ${response?.data?.sector?.healthcare}` },
                { id: 4, value: response?.data?.sector?.other, label: `Others: ${response?.data?.sector?.other}` },

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
        <div className='flex-1 bg-white w-auto rounded-md drop-shadow p-4 mb-2 overflow-x-auto'>
                <div className='text-2xl font-bold text-prc'>User Location</div>
                <div className='bg-prc h-0.5 mt-1 rounded-full w-72'/>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: userLocation.map((location) => location.label.split(':')[0]) }]}
                    series={[
                        {
                            data: userLocation.map((location) => location.value),
                        },
                    ]}
                    width={2100}
                    height={600}
                />
            </div>
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
                            paddingAngle: 2,
                            cornerRadius: 5,
                            
                              
                            cx: 100,
                            cy: 120,
                        },
                        
                    ]}
                    width={400}
                    height={250}
                />
            </div>

            {/* <div className='flex-1 bg-white w-auto rounded-md drop-shadow p-4'>
                <div className='text-2xl font-bold text-prc'>Applicant in Capas</div>
                <div className='bg-prc h-0.5 mt-1 rounded-full w-72'/>
                <PieChart
                    series={[
                        {
                            data: capasApplicant,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 2,
                            cornerRadius: 5,
                            
                            
                            cx: 100,
                            cy: 120,
                        },
                        
                    ]}
                    width={400}
                    height={250}
                />
            </div> */}
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
                            paddingAngle: 2,
                            cornerRadius: 5,
                            
                            
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
                            paddingAngle: 2,
                            cornerRadius: 5,
                            cx: 100,
                            cy: 120,
                        },
                        
                    ]}
                    width={400}
                    height={250}
                    />
            </div>
        </div>
        <div className='flex-1 mt-2 bg-white w-auto rounded-md drop-shadow p-4'>
            <div className='text-2xl font-bold text-prc'>Sectors</div>
            <div className='bg-prc h-0.5 mt-1 rounded-full w-72'/>
            <PieChart
                series={[
                    {
                        data: sector,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 5,
                        cx: 100,
                        cy: 120,
                    },
                    
                ]}
                width={400}
                height={250}
                />
        </div>
        </>
    )
}
