import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { crud } from '../resource/api';
import Loading from '../cards/Loading';
import { useNavigate } from 'react-router-dom';

export default function ProfileComponent() {
    const navigate = useNavigate()
    const { user, apiClient, token } = useContext(AppContext);
    const [selectedImage, setSelectedImage] = useState('');
    const [newForm, setNewForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [passwordValidation, setPasswordValidation] =useState()


    const updateProfile = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            
            // Append form data
            for (const key in newForm) {
                formData.append(key, newForm[key]);
            }
            const response = await apiClient.post(crud.concat(`user-update/${newForm?.id}`), formData, {
                headers: {
                    'Authorization': `Bearer ${newForm?.token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            navigate(0)
        } catch (error) {
            console.error(error.response);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (name === 'image') {
            setNewForm({
                ...newForm,
                image: files[0], // Store the file object
            })
            const imageUrl = URL.createObjectURL(files[0])
            setSelectedImage(imageUrl)
        } else {
            if(name === 'password'){
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
                setPasswordValidation(validation);
            }
            setNewForm({
                ...newForm,
                [name]: value,
            });

        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile();
    };

    useEffect(() => {
        if (user) {
            setNewForm({
                id: user?.data?.id,
                address: user?.data?.address,
                first_name: user?.data?.first_name,
                last_name: user?.data?.last_name,
                middle_name: user?.data?.middle_name,
                email: user?.data?.email,
                phone_no: user?.data?.phone_no,
                lib_gender_id: user?.data?.gender?.id,
                username: user?.data?.username,
                password: '',
                password_confirmation: '',
                desc: user?.data?.desc,
                sector: user?.data?.sector,
                token: token,
                image: [],
            });
            setSelectedImage(user?.data?.image)
            console.log(user)
        }
    }, [user]);

    return (
        <div>
            {loading && <Loading />}
            <div className='text-2xl font-bold text-text'>
                My Profile
                <div className='p-4 bg-white rounded-md mt-2'>
                    <form onSubmit={handleSubmit} className='text-base font-normal flex flex-col gap-10'>
                        <div className='flex-1 flex gap-4 '>
                            <div className=' flex-1'>
                                Basic Information
                            </div>
                            <div className='bg-text opacity-35 w-0.5 flex-none'/>
                            <div className='flex flex-col flex-1 gap-2'>
                                <label 
                                    className='h-24 w-24  rounded-full cursor-pointer'
                                    htmlFor='upload-profile'
                                    style={{
                                        backgroundImage: `url(${selectedImage})`,
                                        backgroundSize: 'cover', // Make the image cover the entire div
                                        backgroundPosition: 'center', // Center the image
                                    }}
                                >
                                    <div className='bg-black flex hover:bg-opacity-30 w-full h-full rounded-full bg-opacity-10 justify-center items-center'>
                                        <span className="icon-[basil--camera-solid] w-16 h-16 opacity-60 hover:opacity-100"></span>
                                    </div>
                                </label>
                                <label className='text-sm mb-2'> Change Profile</label>
                                <input 
                                    type='file' 
                                    name='image' 
                                    id='upload-profile'
                                    accept='.jpg,.jpeg,.png'
                                    onChange={handleChange}
                                    className='bg-black hidden p-2 cursor-pointer bg-opacity-5' 
                                />
                                <div className='flex gap-2'>
                                    <div className='flex flex-1 flex-col'>
                                        <label className='text-sm'> First Name</label>
                                        <input 
                                            type='text' 
                                            name='first_name'
                                            placeholder='First Name'
                                            value={newForm?.first_name || ''}
                                            onChange={handleChange}
                                            className='p-2 border-b-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-sm'> Middle Name</label>
                                        <input 
                                            type='text' 
                                            name='middle_name'
                                            value={newForm?.middle_name || ''}
                                            onChange={handleChange}
                                            placeholder='Middle Name'
                                            className='p-2 border-b-2'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-sm'> Last Name</label>
                                        <input 
                                            type='text' 
                                            name='last_name'
                                            value={newForm?.last_name || ''}
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
                                            type='text' 
                                            name='lib_gender_id'
                                            placeholder='Address'
                                            value={newForm?.lib_gender_id || ''}
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
                                            name='address'
                                            placeholder='Address'
                                            value={newForm?.address || ''}
                                            onChange={handleChange}
                                            className='p-2 border-b-2'
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex flex-1 flex-col'>
                                        <label className='text-sm'> Email</label>
                                        <input 
                                            type='text' 
                                            name='email'
                                            placeholder='Email'
                                            value={newForm?.email || ''}
                                            onChange={handleChange}
                                            className='p-2 border-b-2'
                                        />
                                    </div>
                                    <div className='flex flex-1 flex-col'>
                                        <label className='text-sm'> Phone No</label>
                                        <input 
                                            type='text' 
                                            name='phone_no'
                                            value={newForm?.phone_no || ''}
                                            onChange={handleChange}
                                            placeholder='Ex: 094827362941'
                                            className='p-2 border-b-2'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex-1 flex gap-4 '>
                            <div className=' flex-1'>
                                Account Information
                            </div>
                            <div className='bg-text opacity-35 w-0.5 flex-none'/>
                            <div className='flex flex-col flex-1 gap-2'>
                                <div className='flex gap-2'>
                                    <div className='flex flex-1 flex-col'>
                                        <label className='text-sm'> Username</label>
                                        <input 
                                            type='text' 
                                            name='username'
                                            placeholder='Username'
                                            value={newForm?.username || ''}
                                            onChange={handleChange}
                                            className='p-2 border-b-2'
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex flex-1 flex-col'>
                                        <label className='text-sm'> Sector</label>
                                        <input 
                                            type='text' 
                                            name='sector'
                                            placeholder='Sector'
                                            value={newForm?.sector || ''}
                                            onChange={handleChange}
                                            className='p-2 border-b-2'
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex flex-1 flex-col'>
                                        <label className='text-sm'> Objective / Description</label>
                                        <textarea 
                                            type='text' 
                                            name='desc'
                                            placeholder='Say Something about you'
                                            value={newForm?.desc || ''}
                                            onChange={handleChange}
                                            className='p-2 border-b-2 h-40 resize-none'
                                        />
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className='flex-1 flex gap-4 '>
                            <div className=' flex-1'>
                                Change Password
                            </div>
                            <div className='bg-text opacity-35 w-0.5 flex-none'/>
                            <div className='flex flex-col flex-1 gap-2'>
                                <div className='flex gap-2'>
                                    <div className='flex flex-1 flex-col'>
                                        <label className='text-sm'> Password</label>
                                        <input 
                                            type='password' 
                                            name='password'
                                            placeholder='Password'
                                            value={newForm?.password || ''}
                                            onChange={handleChange}
                                            className='p-2 border-b-2'
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex flex-1 flex-col'>
                                        <label className='text-sm'> Password Confirmation</label>
                                        <input 
                                            type='password' 
                                            name='password_confirmation'
                                            placeholder='Password Confirmation'
                                            value={newForm?.password_confirmation || ''}
                                            onChange={handleChange}
                                            className='p-2 border-b-2'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='bg-prc text-white py-2 rounded-md'>Confirm Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
