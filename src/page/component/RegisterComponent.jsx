import React, { useContext, useState } from 'react';
import Logo, { Badge } from '../cards/Logo';
import bgImage from '../../assets/bg.png';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { auth } from '../resource/api';
import Warning from '../cards/Warning';
import { Navigate, NavLink } from 'react-router-dom';
import Loading from '../cards/Loading';

export default function RegisterComponent() {
    const {setToken, token, setRole, apiClient} = useContext(AppContext)
    const [warning, setWarning] = useState()
    const [loading, setLoading]  = useState(false)
    const [route, setRoute] = useState('')
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const handleChane = (e) =>{
        const {name, value} = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            const response = await apiClient.post(auth.concat('login'), loginForm, {
                'Content-Type': 'application/json'
            })
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
            setRoute((response.data.user.role.desc).toLowerCase())
            setRole(response.data.user.role.desc)
            localStorage.setItem('role', response.data.user.role.desc)
        }catch (error){
            console.log("Error: ", error.response.data)
            setWarning(error.response.data.message)
        }finally{
            setLoading(false)
        }
    }

    return (
    <>
    {token != null && (<Navigate to={`/${route}`} replace={true} />)}
    {loading && (<Loading/>)}
    <div className='flex items-center justify-center h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat' 
        style={{ backgroundImage: `url(${bgImage})` }}>
        <div className=' absolute inset-0 backdrop-blur-md flex items-center justify-center'>
            <div className='flex w-auto rounded-md p-5 drop-shadow-sm'>
                <div className='bg-gradient-to-r from-prc to-white rounded-l-md p-5 pr-24 py-10 flex flex-col'>
                    <div className='flex-1 h-auto text-center text-white text-sm'>
                        Welcome to
                    </div>
                    <div className='flex-1'></div>
                    <div className='flex-none flex justify-center items-center'>
                        <div className='bg-white p-1 rounded-lg'>
                            <Badge />
                        </div>
                    </div>
                    <div className='flex-none text-xs text-center font-thin max-w-80 mt-2 text-white'>
                        Job-Matching streamlines the hiring process by intelligently connecting skilled professionals with employers seeking the perfect fit.
                    </div>
                    <div className='flex-1'></div>
                    <div className='flex-1'></div>
                    <div className='flex-1'></div>
                    <div className='flex-none text-center font-thin text-xs text-white'>@ Copyright Emes | More</div>
                </div>
                <div className='bg-white rounded-r-md py-14 px-8 text-text'>
                    <div className='font-extralight text-2xl'>
                        Register
                    </div>
                    <div className='mb-8 text-sm'>Please Select your Account</div>
                    {warning && (<Warning message={warning}/>)}
                    <div className='flex flex-col'>
                        <NavLink to={'applicant'} className='bg-prc rounded-md cursor-pointer text-white text-center py-2 mb-2 select-none'>Applicant</NavLink>
                        <NavLink to={'employer'}  className='bg-src rounded-md cursor-pointer text-white text-center py-2 mb-2 select-none'>Employer</NavLink>
                    </div>
                    <div className='font-sans font-normal opacity-70 text-xs mb-5 mt-1 flex'>
                        Already have an Account? 
                        <NavLink to={'/login'} className='ml-1 text-blue-700 underline'>Login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>

    );
}
