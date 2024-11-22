import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { crud } from '../resource/api'

export default function PasswordResetComponent() {
    const {apiClient} = useContext(AppContext)
    const [data, setData] =useState()
    const handleSubmit = async (e) => {
        try {
            const response = await apiClient.post(crud.concat('forgot-password'), data)
            console.log(response)
        } catch (error ){
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setData((prev)=> ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <input 
            onChange={handleChange} 
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                   handleSubmit()
                    // Your custom logic here
                }
            }} 
            name="email" 
            placeholder="email" 
            type="email" 
            required 
        />
    )
}
