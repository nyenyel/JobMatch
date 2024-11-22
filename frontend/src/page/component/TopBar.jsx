import React, { useContext, useState } from 'react'
import Logo from '../cards/Logo'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { auth } from '../resource/api'
import Loading from '../cards/Loading'
import SearchComponent from './SearchComponent'

export default function TopBar({links}) {
  const navigate = useNavigate()
  const {token, setToken, setRole,apiClient ,user} = useContext(AppContext)
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
  const handleNavigate = () => {
    navigate(`profile`)
    handleVissibility()
  }
  return (
    <>
    {loading &&  (<Loading />)}
    <div className='px-5 bg-white flex '>
      <div className=' flex-none'>
        <Logo />
      </div>
      <div className=' flex flex-1 mr-4'>
        <div className='  cursor-pointer flex-1 hover:bg-opacity-5 content-center px-8'>
          <SearchComponent/>
        </div>
        <div className='max-[1200px]:hidden flex'>
          {links.map((item, index) => (
            <NavLink key={index} to={item} 
            className={({ isActive }) => {
              return ` hover:bg-black hover:bg-opacity-5 content-center px-8 ${isActive ? 'border-b-4 border-prc font-bold text-prc': ''}`
            }}>
              {item}
            </NavLink>
          ))}
        </div>
      </div>
      <div className='flex h-auto items-center justify-center'>
      <div>
        <div className="relative inline-block text-left">
          <div>
            <button type="button" onClick={handleVissibility} className="inline-flex w-full justify-center gap-x-1.5 rounded-full  p-5 text-sm font-semibold bg-prc text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true"
              style={{
                backgroundImage: `url(${user?.data?.image})`,
                backgroundSize: 'cover', // Optional: Make the image cover the entire div
                backgroundPosition: 'center', // Optional: Center the image
              }}>
              
            </button>
          </div>
          <div className={`${logoutIsVissible ? 'absolute' : 'hidden'} right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className='min-[1200px]:hidden flex flex-col gap-2 p-4'>
              {links.map((item, index) => (
                <NavLink key={index} to={item} 
                className={({ isActive }) => {
                  return ` hover:bg-black hover:bg-opacity-5 content-center  ${isActive ? 'border-b-4 border-prc font-bold text-prc': ''}`
                }}>
                  {item}
                </NavLink>
              ))}
              <NavLink  to={'contact'} 
                className={({ isActive }) => {
                  return ` hover:bg-black hover:bg-opacity-5 content-center  ${isActive ? 'border-b-4 border-prc font-bold text-prc': ''}`
                }}>
                  Contact
                </NavLink>
            </div>
            <div className="py-1" role="none">
                <button onClick={handleNavigate} className="block hover:bg-black hover:bg-opacity-5 w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-3">Profile</button>
            </div>
            <div className="py-1" role="none">
                <button onClick={handleLogout} className="block w-full hover:bg-black hover:bg-opacity-5 px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabIndex="-2" id="menu-item-4">Sign out</button>
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