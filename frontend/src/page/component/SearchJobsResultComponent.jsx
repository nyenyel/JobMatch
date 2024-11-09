import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { crud } from '../resource/api'
import Loading from '../cards/Loading'
import ProfessionLevel from '../cards/ProfessionLevel'
import Skill from '../cards/Skill'

export default function SearchJobsResultComponent() {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const {apiClient} = useContext(AppContext)
    const getData = async () => {
        setLoading(true)
        try{
            const response = await apiClient.get(crud.concat(`job/${id}`))
            console.log(response.data.data)
            setData(response.data.data)
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
        <div className='flex-1 p-4 bg-white rounded-md h-full mb-2'>
                    <div className='font-bold text-xl'>{data?.company?.title}</div>
                    <div className='font-base text-sm'>Employer: {data?.employer?.last_name}, {data?.employer?.first_name} {data?.employer?.middle_name.charAt(0)}. ({data?.employer?.rating}★)</div>
                    <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-1'></div>
                    <div className='font-bold text-sm'>Description</div>
                    <div className='font-base text-sm mb-2'>{data?.company?.desc}</div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col'>
                            <div className='font-bold text-sm'>Email</div>
                            <div className='font-base text-sm mb-2'>{data?.employer?.email}</div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='font-bold text-sm'>Phone No.</div>
                            <div className='font-base text-sm mb-2'>{data?.employer?.phone_no}</div>
                        </div>
                    </div>
                </div>
        <div className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'>
            <div className=' flex-1'>
                <div className='font-bold text-xl'>{data?.title}</div>
                <div className='font-base text-sm'>Duration untill: {data?.post_duration}</div>
                <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
                <div className='font-bold text-sm'>Description</div>
                <div className='font-base text-sm mb-2'>{data?.desc}</div>
                <div className='font-bold text-sm'>Requirements</div>
                <div className='flex flex-wrap pt-1 gap-1 mb-2'>
                    <ProfessionLevel data={data?.level?.desc}/>
                    {data?.skill.map((item, index) => (
                    <Skill key={index} data={item}/>
                    ))}
                </div>
            </div>
            <div className="flex-none  flex flex-col items-center justify-center p-4">
                <div className="text-center text-4xl mb-2 font-bold">{data?.application?.length}</div>
                <div className="text-center">Applicants</div>
            </div>
        </div>
        </>
    )
}
