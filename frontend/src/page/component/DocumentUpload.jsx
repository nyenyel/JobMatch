import { baseURL } from '../resource/api';
import React, { useContext, useState } from 'react';
import Logo, { Badge } from '../cards/Logo';
import bgImage from '../../assets/bg.png';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { auth } from '../resource/api';
import Warning from '../cards/Warning';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Loading from '../cards/Loading';

export default function DocumentUpload() {
    const navigate = useNavigate()
    const {setToken, token, setRole , apiClient} = useContext(AppContext)
    const [file, setFile] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [password, setPassword] = useState(null);
    const [warning, setWarning] = useState()
    const [loading, setLoading]  = useState(false)
    const [route, setRoute] = useState('')
    const [error, setError] = useState(null);
    const [passwordValidation, setPasswordValidation] =useState()
    const [passwordIsVissible, setPasswordIsVissible]  = useState('password')
    const fileName = 'templates.docx' <div className=""></div>
    const documentURL = `${baseURL}storage/download/${fileName}`
    const handlePassword = (e) => {
        if (e.target.checked) {
            setPasswordIsVissible('text');  // Show password
        } else {
            setPasswordIsVissible('password');  // Hide password
        }
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChange = (e) => {
        const {name, value} = e.target
        let validation  = []

        if (!/[A-Z]/.test(value)) {
            validation.push("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(value)) {
            validation.push("Password must contain at least one lowercase letter.");
        }
        if (!/[0-9]/.test(value)) {
            validation.push("Password must contain at least one number.");
        }
        if (value.length < 8) {
            validation.push("Password must be at least 8 characters long.");
        }

        setPassword({
            ...password,
            [name]:value
        })
        setPasswordValidation(validation);
    }
    const handleDownload = async () => {
        setLoading(true); // Set loading to true when the download starts

        setTimeout(() => {
            const link = document.createElement('a');
            link.href = documentURL;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        
            setLoading(false); 
        }, 1000); 
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('password', password?.password);
        formData.append('password_confirmation', password?.password_confirmation);
        
        try {
            if(passwordValidation.length === 0){
                setLoading(true)
                const response = await apiClient.post(`${baseURL}api/scan-docx`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setResponseData(response.data.data);
                setError(null);
                if(response.data){
                    // navigate('/login')
                    alert("User Registered")
                    
                }
            }
        } catch (err) {
            console.log(err.response.data.errors)
            setError(err.response.data.errors);
            setResponseData(null);
        } finally {
            setLoading(false)
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
                    <div className='bg-prc max-[1100px]:hidden to-white rounded-l-md p-10  py-10 flex flex-col'>
                        <div className='flex-1 h-auto text-center text-white text-sm'>
                            Welcome to
                        </div>
                        <div className='flex-1'></div>
                        <div className='flex-none flex justify-center items-center'>
                            <div className='p-1 py-4 bg-white  rounded-full'>
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
                        <div className='mb-8 text-sm'>Please Enter your Login Information.</div>
                        <div className='flex flex-col mb-2'>
                            <label className='font-sans font-medium text-sm'>Please use this as a template.</label>
                            <button disabled={loading} onClick={handleDownload} className='hover:bg-prc hover:bg-opacity-10 border-2 border-prc text-prc w-full py-2 rounded-md flex items-center justify-center gap-2'>
                                <span className="icon-[mingcute--document-fill] w-6 h-6"></span>
                                Download Template
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col mb-4'>
                                <label className='font-sans font-medium text-sm'>Select your resume (.docx)</label>
                                <input className='border-b-2 mt-1 p-1 cursor-pointer' type="file" accept=".docx" onChange={handleFileChange} />
                                {error?.file?.map((item, index) => <div className='error text-red-600 text-sm opacity-50' key={index}>{item}</div>)}
                                {error?.email?.map((item, index) => <div className='error text-red-600 text-sm opacity-50' key={index}>{item}</div>)}
                            </div>
                            <div className='flex  flex-col gap-2'>
                            <label className='font-sans font-medium text-sm'>Password</label>
                            <input 
                                required
                                placeholder='password'
                                type={`${passwordIsVissible}`}
                                name="password_confirmation" 
                                onChange={handleChange}
                                className='rounded-sm mb-2 p-3 py-2 border-b-2 min-w-64 -mt-1 focus:border-b-2 focus:border-prc focus:outline-none focus:ring-0 ring-0' 
                            />
                            <label className='font-sans font-medium text-sm'>Confirm Password</label>
                            <input 
                                required
                                placeholder='password'
                                type={`${passwordIsVissible}`}
                                name='password' 
                                onChange={handleChange}
                                className='rounded-sm mb-2 p-3 py-2 border-b-2 min-w-64 -mt-1 focus:border-b-2 focus:border-prc focus:outline-none focus:ring-0 ring-0' 
                            />
                            </div>
                            <div className='flex gap-2'>
                                <input className='flex-none' type='checkbox' onClick={handlePassword}/>
                                <label className='flex-none'>Show Password</label>
                            </div>
                            {error?.password?.map((item, index) => <div className='error text-red-600 text-sm opacity-50' key={index}>{item}</div>)}
                            {passwordValidation?.map((item, index) => <div className='error text-red-600 text-sm opacity-50' key={index}>{item}</div>)}
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
