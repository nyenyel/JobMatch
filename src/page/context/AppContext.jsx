import axios from 'axios'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { auth, baseURL } from '../resource/api'
import Cookie from 'js-cookie'

export const AppContext = createContext()

export default function AppProvider( {children} ) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user,setUser] = useState()
    const [role, setRole] = useState(localStorage.getItem('role'))

    const getCSRFToken = useCallback(() => {
        return Cookie.get('XSRF-TOKEN');
    }, []);

    const apiClient = axios.create({
        withCredentials: true, 
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            // Remove Content-Type here
        }
    });


    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`; // Set the token dynamically
                config.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN'); // Set the CSRF token dynamically
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

    const getXsrf = async() => {
        
        try{
            const response =await apiClient.get(('sanctum/csrf-cookie'), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }catch (error){
            console.log('Error: ', error)
        }
    }
    useEffect (() => {
        if(token){
            getUser()
            getXsrf()
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