import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { crud, ruleBased } from '../resource/api'
import Loading from '../cards/Loading'

export default function SearchCompanyResultComponent({isApplicant = false}) {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const {apiClient, user} = useContext(AppContext)
    const getData = async () => {
        setLoading(true)
        try{
            const response = await apiClient.get(crud.concat(`company/${id}`))
            setData(response.data.data)
            console.log(response.data.data.partnered)
        } catch (error){
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=> {
        getData()
    }, [id])
    return (
        <>
        {loading && <Loading />}
        <div className='flex gap-2 max-[800px]:flex-col'>
            <div className='flex-none h-full min-w-96 bg-white p-5 rounded-md text-xl font-bold text-text'>
                <div className='flex bg-prc rounded-full w-12 h-12' style={{ backgroundImage: `url(${data?.owner?.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                {data?.owner?.last_name}, {data?.owner?.first_name} {data?.owner?.middle_name.charAt(0)}. {`(★${data?.owner?.rating})`}
                <div className=' flex mt-2 font-normal text-base'>{data?.owner?.email}</div>
                <div className=' flex font-normal text-base'>{data?.owner?.phone_no}</div>
                <div className=' flex font-normal text-base'>{data?.owner?.sector}</div>
                My Reviews
                {data?.owner?.review.map((item, index) => (
                    <div key={index} className=' flex font-normal text-base'>{`(★${item.rate}) ${item?.review}`}</div>
                ))}
            </div>
            <div className='flex-1 h-full'>
                <div className='flex flex-col bg-white p-5 rounded-md text-xl font-bold text-text'>
                    {data?.title}
                    <div className=' flex mt-2 font-normal text-base'>{data?.desc}</div>
                    {data?.partnered === 1 ? (
                        <div className='flex mt-2 '> 
                            <div className=' flex-none font-normal  text-base bg-prc rounded-md p-2 text-white '>Partnered</div>
                            <div className='flex-1'/>
                        </div>
                    ): (
                        <div className='flex mt-2 '> 
                            <div className=' flex-none font-normal  text-base bg-red-700 rounded-md p-2 text-white '>Not Partnered</div>
                            <div className='flex-1'/>
                        </div>

                    )}

                </div>
                <div className='flex gap-2 flex-col mt-2'>
                {isApplicant ? (
                    data?.jobs?.map((item, index) => (
                        <NavLink to={`/applicant/jobs/${item.id}`} 
                                state={{ 
                                    jobData: item, 
                                    percentage: 0,
                                    user: user?.data
                                }}
                                key={index} className='bg-white p-5 rounded-md'>
                            <div className='font-bold'>{item?.title}</div>
                            <div className='text-sm'>Post Duration: {item?.post_duration}</div>
                            <div className='text-sm'>Required Experience: {item?.experience} years</div>
                            <div className='text-sm'>Job Description: {item?.desc}</div>
                        </NavLink>
                    ))
                ) : (
                    data?.jobs?.map((item, index) => (
                        <div key={index} className='bg-white p-5 rounded-md'>
                            <div className='font-bold'>{item?.title}</div>
                            <div className='text-sm'>Post Duration: {item?.post_duration}</div>
                            <div className='text-sm'>Required Experience: {item?.experience} years</div>
                            <div className='text-sm'>Job Description: {item?.desc}</div>
                        </div>
                    ))
                )}

                </div>
            </div>
        </div>
        </>
    )
}
