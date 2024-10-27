import React, { useContext, useState } from 'react';
import Logo, { Badge } from '../cards/Logo';
import bgImage from '../../assets/bg.png';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { auth } from '../resource/api';
import Warning from '../cards/Warning';
import { Navigate, NavLink } from 'react-router-dom';
import Loading from '../cards/Loading';

export default function Login() {
    const {setToken,role, token, setRole,apiClient} = useContext(AppContext)
    const [warning, setWarning] = useState()
    const [loading, setLoading]  = useState(false)
    const [route, setRoute] = useState('')
    const [passwordIsVissible, setPasswordIsVissible]  = useState('password')
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const handlePassword = (e) => {
        if (e.target.checked) {
            setPasswordIsVissible('text');  // Show password
        } else {
            setPasswordIsVissible('password');  // Hide password
        }
    }
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
    {token != null && (<Navigate to={`/${role}`} replace={true} />)}
    {loading && (<Loading/>)}
    <div className='flex items-center justify-center h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat' 
        style={{ backgroundImage: `url(${bgImage})` }}>
        <div className=' absolute inset-0 backdrop-blur-md flex items-center justify-center'>
            <div className='flex w-auto rounded-md p-5 drop-shadow-sm'>
                <div className='bg-prc rounded-l-md p-10 py-10 flex flex-col'>
                    <div className='flex-1 h-auto text-center text-white text-sm'>
                        Welcome to
                    </div>
                    <div className='flex-1'></div>
                    <div className='flex-none flex justify-center items-center'>
                        <div className='bg-white p-1 py-4 rounded-lg'>
                            <Badge />
                        </div>
                    </div>
                    <div className='flex-none text-sm text-center font-thin max-w-80 mt-2 text-white'>
                        Job-Matching streamlines the hiring process by intelligently connecting skilled professionals with employers seeking the perfect fit.
                    </div>
                    <div className='flex-1'></div>
                    <div className='flex-1'></div>
                    <div className='flex-1'></div>
                    <div className='flex-none text-center font-thin text-xs text-white'>@ Copyright Emes | More</div>
                </div>
                <div className='bg-white rounded-r-md py-14 px-8 text-text'>
                    <div className='font-extralight text-2xl'>
                        Login
                    </div>
                    <div className='mb-8 text-sm'>Please Enter your Login Information.</div>
                    {warning && (<Warning message={warning}/>)}
                    <form onSubmit={handleSubmit}>
                        <label className='font-sans font-medium text-sm'>E-mail</label>
                        <br />
                        <input 
                            onChange={handleChane}
                            type='text' 
                            name='email' 
                            placeholder='example@gmail.com' 
                            className='rounded-sm mb-2 p-3 py-2 border-b-2 min-w-64 -mt-1 focus:border-b-2 focus:border-prc focus:outline-none focus:ring-0 ring-0' 
                        />
                        <br />
                        <label className='font-sans font-medium text-sm'>Password</label>
                        <br />
                        <input 
                            onChange={handleChane}
                            type={`${passwordIsVissible}`} 
                            name='password' 
                            placeholder='Password' 
                            className='rounded-sm p-3 py-2 border-b-2 min-w-64 -mt-1 focus:border-b-2 focus:border-prc focus:outline-none focus:ring-0 ring-0' 
                        />
                        <div className='flex gap-2 mt-2'>
                            <input className='flex-none' type='checkbox' onClick={handlePassword}/>
                            <label className='flex-none'>Show Password</label>
                        </div>
                        <br />
                        <div className='font-sans font-normal opacity-70 text-xs mb-5 mt-1 flex'>
                            Doesn't have an Account? 
                            <NavLink to={'/register'} className='ml-1 text-blue-700 underline'>Register</NavLink>
                        </div>
                        <button type='submit' className='font-bold text-white w-full px-5 py-2 rounded-full bg-prc'>SIGN IN</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>

    );
}
