import React, { useContext, useState } from 'react'
import Logo from '../cards/Logo'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { auth } from '../resource/api'
import Loading from '../cards/Loading'

export default function TopBar({links}) {
  const {token, setToken, setRole} = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const handleLogout = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const response = await axios.post(auth.concat('logout'), {}, {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      setToken(localStorage.removeItem('token'))
      setRole(localStorage.removeItem('role'))
      console.log(response.data.data)
    } catch (error){
      console.log('Error: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    {loading &&  (<Loading />)}
    <div className='px-5 bg-white flex'>
      <div className='py-3 flex-1'>
        <Logo />
      </div>
      <div className=' flex mr-4'>
      {links.map((item, index) => (
        <NavLink key={index} to={item} 
        className={({ isActive }) => {
          return ` hover:bg-black hover:bg-opacity-5 content-center px-8 ${isActive ? 'border-b-4 border-prc font-bold text-prc': ''}`
        }}>
          {item}
        </NavLink>
      ))}
      </div>
      <div className='flex h-auto items-center justify-center'>
        <div className='bg-black cursor-pointer bg-opacity-20 w-11 h-11 ml-6 rounded-full' onClick={handleLogout}></div>
      </div>
    </div>
    </>
  )
}
