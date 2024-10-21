import { baseURL } from '../resource/api';
import React, { useContext, useState } from 'react';
import Logo, { Badge } from '../cards/Logo';
import bgImage from '../../assets/bg.png';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { auth } from '../resource/api';
import Warning from '../cards/Warning';
import { Navigate, NavLink } from 'react-router-dom';
import Loading from '../cards/Loading';

export default function DocumentUpload() {
    const {setToken, token, setRole} = useContext(AppContext)
    const [file, setFile] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [password, setPassword] = useState(null);
    const [warning, setWarning] = useState()
    const [loading, setLoading]  = useState(false)
    const [route, setRoute] = useState('')

    const [error, setError] = useState(null);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChange = (e) => {
        const {name, value} = e.target
        setPassword({
            ...password,
            [name]:value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('password', password?.password);
        formData.append('password_confirmation', password?.password_confirmation);

        try {
            const response = await axios.post(`${baseURL}api/scan-docx`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponseData(response.data.data);
            setError(null);
        } catch (err) {
            console.log(err)
            setError(err.response ? err.response.data.message || err.response.data.email[0] : 'An error occurred.' );
            setResponseData(null);
        }
    };

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
                            Login
                        </div>
                        <div className='mb-8 text-sm'>Please Enter your Login Information.</div>
                       
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col mb-4'>
                                <label className='font-sans font-medium text-sm'>Select your resume (.docx)</label>
                                <input className='border-b-2 mt-1 p-1 cursor-pointer' type="file" accept=".docx" onChange={handleFileChange} />
                            </div>
                            <div className='flex  flex-col gap-2'>
                            <label className='font-sans font-medium text-sm'>Password</label>
                            <input 
                                placeholder='password'
                                type="password" 
                                name="password_confirmation" 
                                onChange={handleChange}
                                className='rounded-sm mb-2 p-3 py-2 border-b-2 min-w-64 -mt-1 focus:border-b-2 focus:border-prc focus:outline-none focus:ring-0 ring-0' 
                            />
                            <label className='font-sans font-medium text-sm'>Confirm Password</label>
                            <input 
                                placeholder='password'
                                type="password" 
                                name='password' 
                                onChange={handleChange}
                                className='rounded-sm mb-2 p-3 py-2 border-b-2 min-w-64 -mt-1 focus:border-b-2 focus:border-prc focus:outline-none focus:ring-0 ring-0' 
                            />
                            </div>
                        {error && <div className="error text-red-600 text-sm opacity-0">{error}</div>}
                            <button className='font-bold text-white w-full px-5 py-2 rounded-full bg-prc mt-2' type="submit">Register</button>
                        </form>
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
