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

export default function AdminEmployerRegister() {
    const navigate = useNavigate()
    const {setToken, token, setRole , apiClient} = useContext(AppContext)
    const [file, setFile] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [data, setData] = useState(null);
    const [passwordValidation, setPasswordValidation] =useState()
    const [warning, setWarning] = useState()
    const [loading, setLoading]  = useState(false)
    const [route, setRoute] = useState('')
    const [error, setError] = useState(null);
    const [passwordIsVissible, setPasswordIsVissible]  = useState('password')
    const fileName = 'template.docx'
    const documentURL = `${baseURL}storage/download/${fileName}`
    const handlePassword = (e) => {
        if (e.target.checked) {
            setPasswordIsVissible('text');  // Show password
        } else {
            setPasswordIsVissible('password');  // Hide password
        }
    }


    const handleChange = (e) => {
        const {name, value} = e.target
        let validation  = []
        if(name === 'password'){
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

        }
        setData({
            ...data,
            [name]:value,
            rating: 0,
            lib_role_id: 2,
            lib_profession_id: 1
        })
        setPasswordValidation(validation);

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
       
        try {
            setLoading(true)
            console.log(data)
            const response = await apiClient.post(`${baseURL}api/auth/register`, data);
            setResponseData(response.data.data);
            setError(null);
            if(response.data){
                navigate('/login')
                // alert("User Registered")

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
        {loading && (<Loading/>)}
        <div className='bg-white rounded-r-md py-14 px-8 text-text'>
            <div className='font-extralight text-2xl'>
                Register
            </div>
            <div className='mb-8 text-sm'>Please Enter your Login Information.</div>

            <form onSubmit={handleSubmit}>
            <div className='flex gap-2'>
                        <div className='flex flex-1 flex-col'>
                            <label className='text-sm'> First Name</label>
                            <input 
                                required
                                type='text' 
                                name='first_name'
                                placeholder='First Name'
                                onChange={handleChange}
                                className='p-2 border-b-2'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm'> Middle Name</label>
                            <input 
                                required
                                type='text' 
                                name='middle_name'
                                onChange={handleChange}
                                placeholder='Middle Name'
                                className='p-2 border-b-2'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm'> Last Name</label>
                            <input 
                                type='text' 
                                required
                                name='last_name'
                                onChange={handleChange}
                                placeholder='Last Name'
                                className='p-2 border-b-2'
                            />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-1none flex-col'>
                            <label className='text-sm'>Gender</label>
                            <select 
                                required
                                type='text' 
                                name='lib_gender_id'
                                placeholder='Address'
                                onChange={handleChange}
                                className='p-2 border-b-2'
                            >
                                <option value={1}>Male</option>
                                <option value={2}>Female</option>
                            </select>
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <label className='text-sm'> Address</label>
                            <input 
                                type='text' 
                                required
                                name='address'
                                placeholder='Address'
                                onChange={handleChange}
                                className='p-2 border-b-2'
                            />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-1 flex-col'>
                            <label className='text-sm'> Email</label>
                            <input 
                                required
                                type='text' 
                                name='email'
                                placeholder='Email'
                                onChange={handleChange}
                                className='p-2 border-b-2'
                            />
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <label className='text-sm'> Phone No</label>
                            <input 
                                required
                                type='text' 
                                name='phone_no'
                                onChange={handleChange}
                                placeholder='Ex: 094827362941'
                                className='p-2 border-b-2'
                            />
                        </div>
                    </div>
                <div className='flex  flex-col gap-2'>
                <div className='flex flex-1 flex-col'>
                    <label className='text-sm'> Username</label>
                    <input 
                        required
                        type='text' 
                        name='username'
                        placeholder='username'
                        onChange={handleChange}
                        className='p-2 border-b-2'
                    />
                </div>
                <div className='flex flex-1 flex-col'>
                    <label className='text-sm'> Description</label>
                    <textarea 
                        required
                        type='text' 
                        name='desc'
                        placeholder='describe your sel'
                        onChange={handleChange}
                        className='p-2 border-b-2 resize-none'
                    />
                </div>
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
    </>
    )
}
