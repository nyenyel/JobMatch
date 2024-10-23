import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../resource/api'
import Cookie from 'js-cookie'


export const AppContext = createContext()

export default function AppProvider( {children} ) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user,setUser] = useState()
    const [role, setRole] = useState(localStorage.getItem('role'))

    const apiClient = axios.create({
        withCredentials: true, 
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            'Content-Type': 'application/json'
        }
    })

    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (token) {
                config.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN')// Set the token dynamically
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
    );

    const getUser = async () => {
        try{
            const response =await apiClient.get(auth.concat('user'), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            setUser(response.data)
        }catch (error){
            console.log('Error: ', error)
            if(token) {
                localStorage.removeItem('token')
                localStorage.removeItem('role')
            }
        }
    }

    useEffect (() => {
        if(token){
            getUser()
        }
        // console.log(token)
    }, [token])
  return (
    <>
        <AppContext.Provider value={{ token, user, role, setToken, setUser, setRole, apiClient }}>
            {children}
        </AppContext.Provider>
    </>
  )
}

const getCookie = (cookieName) => {
    return Cookie.get(cookieName)
}