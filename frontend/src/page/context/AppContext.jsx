import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../resource/api'


export const AppContext = createContext()

export default function AppProvider( {children} ) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user,setUser] = useState()
    const [role, setRole] = useState(localStorage.getItem('role'))

    const getUser = async () => {
        try{
            const response =await axios.get(auth.concat('user'), {
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
        <AppContext.Provider value={{ token, user, role, setToken, setUser, setRole }}>
            {children}
        </AppContext.Provider>
    </>
  )
}
