import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Loading from '../cards/Loading'
import axios from 'axios'
import { crud } from '../resource/api'
import Redirect, { AdminRedirect, ApplicantRedirect } from '../context/Redirect'
import { useNavigate } from 'react-router-dom'

export default function NewJobComponent() {
    const {user, apiClient} = useContext(AppContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [professions, setProfession] = useState()
    const [level, setLevel] = useState()
    const [skills, setSkills] = useState()
    const [jobForm, setJobForm] = useState({
        title: '',
        desc: '',
        experience: '',
        post_duration: '',
        employer_id: user?.data.id,
        lib_profession_id: '',
        lib_job_status_id: '1',
        company_id: '',
        lib_profession_level:''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setJobForm({
            ...jobForm,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const storeData = async (e) => {
            try {
                const response = await apiClient.post(crud.concat('job'), jobForm, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response)
            } catch (e){
                console.log("error", e)
            } finally {
                setLoading(false)
                navigate('/employer')
            }
        }
        storeData()
    }
    useEffect (() => {
        setJobForm({
            ...jobForm,
            employer_id: user?.data.id
        })
        const getProfessions = async() =>{
            setLoading(true)

            try{
                const response = await apiClient.get(crud.concat('profession'))
                setProfession(response.data.data)
            } catch (e){
                console.log("error",e)
            } finally {
                setLoading(false)
            }
        }
        const getProfessionLevel = async() =>{
            setLoading(true)

            try{
                const response = await apiClient.get(crud.concat('level'))
                setLevel(response.data.data)
            } catch (e){
                console.log("error",e)
            } finally {
                setLoading(false)
            }
        }
        getProfessions()
        getProfessionLevel()
    },[user])
    
    return (
    <>
    {loading && (<Loading />)}
    <Redirect />
    <AdminRedirect />
    <ApplicantRedirect />
    <div className='flex'>
        <div className=' flex-1'></div>
        <div className=' flex-none text-text bg-white rounded-md min-w-96 p-4'>
            <div className=' font-semibold text-lg'>
                Create A Job Post
            </div>
            <div className=' h-0.5 bg-prc max-w-96 mb-3'></div>
            <form onSubmit={handleSubmit}>
                <label className='text-sm'>Please Select your Company</label>
                <ul className="grid w-full gap-1 items-center justify-center grid-cols-4 mb-2">
                    {user?.data.company.map((item, index) => (
                    <li key={index}>
                        <input type="radio" id={`hosting-small-${index}`} name="company_id" value={`${item.id}`} className="hidden peer" onChange={handleChange} required />
                        <label htmlFor={`hosting-small-${index}`} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 ">                           
                            <div className="block">
                                <div className="w-full text-lg font-semibold">{item.title}</div>
                                <div className="w-full truncate max-w-48">{item.desc}</div>
                            </div>
                        </label>
                    </li>
                    ))}
                </ul>
                <label htmlFor='profession' className='text-sm'>What applicant are you looking for?</label>
                <select id="profession" name='lib_profession_id' onChange={handleChange} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-gray-400 ">
                    <option defaultValue>Choose a Profession</option>
                    {professions?.map((item, index) =>(
                        <option key={index} value={item.id}>{item.desc}</option>
                    ))}
                </select>
                <label htmlFor='level' className='text-sm'>What level are you looking for?</label>
                <select id="level" name='lib_profession_level' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-gray-400 ">
                    <option defaultValue>Choose a Level</option>
                    {level?.map((item, index) =>(
                        <option key={index} value={item.id}>{item.desc}</option>
                    ))}
                </select>
                <div className='my-2 flex'>
                    <div className='flex-1 mr-2'>
                        <label  className='text-sm'>Job Title</label>
                        <input type='text' name='title' onChange={handleChange} placeholder='Enter the job title' className='px-3 py-2 border-2 w-full rounded-md'/>
                    </div>
                    <div className='flex-none mr-2'>
                        <label  className='text-sm'>Experience (required)</label>
                        <input required type='number' name='experience' onChange={handleChange} placeholder='Enter years of experience' className='px-3 py-2 border-2 w-full rounded-md'/>
                    </div>
                    <div className='flex-none'>
                        <label className='text-sm'>Post Duration</label>
                        <input type='date' name='post_duration' onChange={handleChange} placeholder='Enter the job title' className='px-3 py-2 border-2 w-full rounded-md'/>
                    </div>
                </div>
                <label htmlFor='level' className='text-sm'>Description</label>
                <textarea 
                    cols={4}
                    rows={5}
                    name='desc' 
                    placeholder="Job Description" 
                    className='mb-2 rounded-md py-2 px-3 border-2 w-full' 
                    onChange={handleChange} 
                />
                <button type='submit' className=' w-full bg-prc py-2 rounded-md text-white mt-2'>Create</button>
            </form>
        </div>
        <div className=' flex-1'></div>
    </div>
    </>
    )
}
