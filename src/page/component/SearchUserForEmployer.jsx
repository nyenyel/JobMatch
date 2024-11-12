import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../cards/Loading';
import { crud } from '../resource/api';
import Skill from '../cards/Skill';
import { ExperienceSummary } from './ApplicantSummaryComponent';

export default function SearchUserForEmployer() {
    const [state, setState] =useState({
        loading: false,
        data: null
    });
    const location = useLocation()
    const { apiClient }= useContext(AppContext)
    const {id} = useParams()

    const handleState = (name, value) => {
        setState((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const getData = async () => {
        handleState('loading', true)
        try {
            const response = await apiClient.get(crud.concat(`user/${id}`))
            handleState('data', response.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            handleState('loading', false)
        }
    } 


    useEffect(() => {
        getData()
    }, [])
    console.log(state.data)
    return (
        <>
        {state.loading && <Loading />}
            <div className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'>

                <div className=' flex-1'>
                <div className=' w-16 h-16 bg-text rounded-full border-2 border-white'
                    style={{
                        backgroundImage: `url(${state?.data?.image})`,
                        backgroundSize: 'cover', // Optional: Make the image cover the entire div
                        backgroundPosition: 'center', // Optional: Center the image
                    }}/>
                    <div className='font-bold text-xl'>{state?.data?.last_name}, {state?.data?.first_name}</div>
                    <div className='font-base text-sm'>Profession: {state?.data?.profession?.desc}</div>
                    <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
                    <div className='font-bold text-sm'>Description</div>
                    <div className='font-base text-sm mb-2'>{state?.data?.desc}</div>
                    <div className='font-bold text-sm'>Skills</div>
                    <div className='flex flex-wrap pt-1 gap-1'>
                        {state?.data?.skill?.map((item, index) => (
                            <Skill key={index} data={item} />
                        ))}
                    </div>
                    <div className='font-bold text-sm mt-2'>Experience</div>
                    <div className='flex flex-col flex-wrap pt-1 gap-1'>
                        {state?.data?.experience?.map((item, index) => (
                            <ExperienceSummary key={index} data={item} />
                        ))}
                    </div>

                    <div className='flex mt-2 gap-16'>
                        <div className='flex-none'>
                            <div className='font-bold text-sm '>Address</div>
                            <div className='font-base text-sm mb-2'>{state?.data?.address}</div>
                        </div>

                        <div className='flex-none'>
                            <div className='font-bold text-sm'>E-mail</div>
                            <div className='font-base text-sm mb-2'>{state?.data?.email}</div>
                        </div>

                        <div className='flex-none'>
                            <div className='font-bold text-sm'>Contact No.</div>
                            <div className='font-base text-sm mb-2'>{state?.data?.phone_no}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
