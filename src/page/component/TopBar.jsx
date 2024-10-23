import React, { useContext, useState } from 'react'
import Logo from '../cards/Logo'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { auth } from '../resource/api'
import Loading from '../cards/Loading'

export default function TopBar({links}) {
  const {token, setToken, setRole,apiClient} = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [logoutIsVissible, setLogoutIsVissible] = useState(false)
  const handleVissibility = () => setLogoutIsVissible(!logoutIsVissible)
  const handleLogout = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const response = await apiClient.post(auth.concat('logout'), {}, {
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
      <div>
        <div className="relative inline-block text-left">
          <div>
            <button type="button" onClick={handleVissibility} className="inline-flex w-full justify-center gap-x-1.5 rounded-full  p-5 text-sm font-semibold bg-prc text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
              
            </button>
          </div>
          <div className={`${logoutIsVissible ? 'absolute' : 'hidden'} right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div className="py-1" role="none">
                <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
            </div>
          </div>
        </div>
      </div>
      
      </div>
    </div>
    </>
  )
}


export function SettingTopBar({links}) {

  return (
    <>
    <div className=' flex'>

      <div className=' flex'>
      {links.map((item, index) => (
        <NavLink key={index} to={item} 
        className={({ isActive }) => {
          return ` hover:bg-black hover:bg-opacity-5 content-center py-2 px-8 ${isActive ? 'border-b-3 border-prc font-bold text-prc': ''}`
        }}>
          {item}
        </NavLink>
      ))}
      </div>
    </div>
    </>
  )
}