import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ruleBased } from '../resource/api'
import { useNavigate } from 'react-router-dom'

export default function SearchComponent() {
    const {apiClient, role} = useContext(AppContext)
    const [data, setData] =useState({type: 'company'})
    const [searchedData, setSearcheedData] =useState()
    const [loading,setLoading] =useState(false)
    const nav = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target
        setData({...data, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response  = await apiClient.post(ruleBased.concat('search'), data)
            setSearcheedData(response.data.results)
            nav(`/${role}/search/${data?.term}`, {state: {result: response.data.results, type: data.type}})
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleNav = (id) => {
        if(data.type === 'user'){nav(`/Admin/Accounts/${id}`)}
    }
    return (
        <div className='flex-1'>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <div className='flex'>
                    {/* Dropdown */}
                    <select 
                        name='type' 
                        onChange={handleChange} 
                        value={data?.type} 
                        className='p-2 bg-black bg-opacity-5 rounded-l-full max-[600px]:truncate max-[600px]:w-14'
                    >
                        <option value={'company'} className=' '>Company</option>
                        <option value={'jobs'}>Jobs</option>
                        {role !== 'Applicant' && <option value={'user'}>Users</option>}
                    </select>

                    {/* Input Field */}
                    <input 
                        required 
                        name='term' 
                        onChange={handleChange} 
                        className='bg-black bg-opacity-5 w-full p-2 flex-1' 
                        placeholder='Search term...'
                    />

                    {/* Search Icon */}
                    <div className='bg-black bg-opacity-5 p-2 pr-4 pt-3 rounded-r-full'>
                        <span className="icon-[mingcute--search-fill] bg-prc"></span>
                    </div>
                </div>
            </form>
        </div>
  )
}
