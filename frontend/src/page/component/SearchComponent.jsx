import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ruleBased } from '../resource/api'
import { useNavigate } from 'react-router-dom'

export default function SearchComponent() {
    const {apiClient} = useContext(AppContext)
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
            console.log(response.data.results)
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
    <div>
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <label className='text-text text-sm '> What are you looking for?</label>
            <div className='flex'>
                <select name='type' onChange={handleChange} value={data?.type} className='p-2 bg-white'>
                    <option value={'company'}>Company</option>
                    <option value={'jobs'}>Jobs</option>
                    <option value={'user'}>Users</option>
                </select>
                <input required name='term' onChange={handleChange} className='bg-white p-2 flex-1 ' placeholder='Search term...'/>
                <div className='bg-white p-2 pr-4 rounded-r-full'>
                    <span className="icon-[mingcute--search-fill] bg-prc"></span>
                </div>
            </div>
        </form>
        <div className='gap-1 flex flex-col mt-2'>
            Search Result
            {searchedData?.map((item, index)=> (
                <div key={index} onClick={() => handleNav(item?.id)} className='bg-white rounded-md p-2 cursor-pointer hover:bg-prc hover:bg-opacity-35 '>
                    {item?.title}
                </div>
            ))}
        </div>
    </div>
  )
}
