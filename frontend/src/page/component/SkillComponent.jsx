import React, { useContext, useEffect, useState } from 'react'
import Redirect, { ApplicantRedirect, EmployerRedirect } from '../context/Redirect'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import Loading from '../cards/Loading'
import axios from 'axios'
import { crud } from '../resource/api'
import { Box, Modal } from '@mui/material'
import { Success } from '../cards/Warning'
import { AppContext } from '../context/AppContext'

export default function SkillComponent() {
    const {id} = useParams()
    const {apiClient} =useContext(AppContext)
    const [data, setData] = useState ({})
    const [loading, setLoading] = useState (false)
    const [message, setMessage] =useState(null)
    const [skillForm, setSkillForm] =useState({
        lib_profession_id: data?.id,
        lib_skill_type_id: 2,
        desc: ''
    })
    const [modalIsOpen, setModalIsOpen] = useState (false)
    const handleModal = () => setModalIsOpen(!modalIsOpen)

    const [editModal, setEditModal] = useState (false)
    const handleEditModal = () => setEditModal(!editModal)

    const [deleteModal, setDeleteModal] = useState (false)
    const handleDeleteModal = () => setDeleteModal(!deleteModal)

    const handleChange = (e) => {
        const {name, value} = e.target
        setSkillForm({
            ...skillForm,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        setLoading(true)
        const storeData = async () => {
            try {
                const response = await apiClient.post(crud.concat('skill'), skillForm, {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response)
                setMessage('Data Updated')
            } catch (e) {
                console.log("Error", e)
            } finally {
                setLoading(false)
            }
        }
        storeData()
        handleModal()
        setTimeout(() => {
            setMessage(null)
        },[3000])
    }

    const handleEditSubmit = (e) => {
        setLoading(true)
        const storeData = async () => {
            try {
                const response = await apiClient.put(crud.concat(`profession/${data?.id}`), skillForm, {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response)
                setMessage('Data Added')
            } catch (e) {
                console.log("Error", e)
            } finally {
                setLoading(false)
            }
        }
        storeData()
        handleEditModal()
        setTimeout(() => {
            setMessage(null)
        },[3000])
    }

    const handleDelete = (e) => {
        setLoading(true)
        const storeData = async () => {
            try {
                const response = await apiClient.delete(crud.concat(`profession/${data?.id}`), {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response)
                setMessage('Data Added')
            } catch (e) {
                console.log("Error", e)
            } finally {
                setLoading(false)
            }
        }
        storeData()
        handleDeleteModal()
        setTimeout(() => {
            setMessage(null)
        },[3000])
    }

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try{
                const response = await apiClient.get(crud.concat(`profession/${id}`))
                setData(response.data.data)
                setSkillForm({
                    ...skillForm,
                    lib_profession_id: response.data.data.id
                })
            } catch (e) {
                console.log('Error', e)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])
    return (
    <>
    <Redirect /> 
    <ApplicantRedirect />
    <EmployerRedirect />
    {loading && (<Loading />)}
    {message && (<Success message={message}/>)}
    <div className='text-2xl text-text font-normal flex '>
        {`Profession >`}
        <div className=' ml-2 font-bold'>
        {data?.desc}
        </div>
    </div>
    <div className=' items-center flex gap-2 '>
        <div className=' content-center bg-prc text-white px-5 py-1 select-none cursor-pointer hover:bg-opacity-80  rounded-md' onClick={handleModal}>
            Add Skill 
        </div>      
        <div onClick={handleEditModal} className='bg-yellow-500 content-center flex p-2 rounded-md cursor-pointer hover:bg-opacity-70'>
            <span className="icon-[fluent--edit-20-filled] bg-white w-4 h-4 "></span>
        </div>
        {/* <div onClick={handleDeleteModal} className='bg-red-700 content-center flex p-2 rounded-md cursor-pointer hover:bg-opacity-70'>
            <span className="icon-[ic--round-delete] bg-white w-4 h-4 "></span>
        </div> */}
        <div className='bg-text flex-1 content-center h-0.5 bg-opacity-30'></div>
    </div>
    <div className='flex'>
        <div className='flex flex-1 h-full'>
        <div className="flex-1 grid grid-cols-5 gap-2 mt-3">
        {data.skill?.map((item, index) => (
            <SkillWithLinks key={index} data={item} />
        ))}
        </div>
        </div>
        <div className=' flex-none mt-3'>
            <Outlet />
        </div>
    </div>

    <Modal open={editModal} onClose={handleEditModal}
        aria-labelledby="modal-title" aria-describedby="modal-description"
        className="flex justify-center z-30 items-center h-screen"
    >
        <Box className="bg-white rounded-lg shadow-lg text-def-t ">
            <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Profession</h3>
            <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
            <div className='px-6 py-3'>
                <div id="modal-description " className='mb-4 flex'>
                    Would you like to update {data?.desc}?
                </div>
                <form onSubmit={handleEditSubmit} className='flex flex-col'>
                    <label  className='text-sm'>Profession Name</label>
                    <input onChange={handleChange} type='text' name='desc' placeholder='Profession Name' className='w-full py-2 px-2 border-2 rounded-md mb-2' />
                    <div className='flex'>  
                    <div className='flex-1'></div>
                    <div className=' cursor-pointer flex-none content-center mr-5 text-prc hover:underline' onClick={handleEditModal}>Cancel</div>
                    <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white hover:bg-opacity-80'>Update</button>
                    </div>
                </form>
            </div>
        </Box>
    </Modal>


    <Modal open={deleteModal} onClose={handleDeleteModal}
        aria-labelledby="modal-title" aria-describedby="modal-description"
        className="flex justify-center z-30 items-center h-screen"
    >
        <Box className="bg-red-100 rounded-lg shadow-lg text-def-t ">
            <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Profession</h3>
            <div className='h-0.5 bg-red-700 rounded-xl  mt-1 mx-6 max-w-40' ></div>
            <div className='px-6 py-3'>
                <div id="modal-description " className='mb-4 flex'>
                    Would you like to delete {data?.desc}?
                </div>
                <form onSubmit={handleDelete} className='flex flex-col'>
                    
                    <div className='flex'>  
                    <div className='flex-1'></div>
                    <div className=' cursor-pointer flex-none content-center mr-5 text-prc hover:underline' onClick={handleDeleteModal}>Cancel</div>
                    <button type='submit' className='mt-2 bg-red-700 rounded-md py-2 font-bold px-4 text-white hover:bg-opacity-80'>Delete</button>
                    </div>
                </form>
            </div>
        </Box>
    </Modal>
    <Modal open={modalIsOpen} onClose={handleModal}
            aria-labelledby="modal-title" aria-describedby="modal-description"
            className="flex justify-center z-30 items-center h-screen"
    >
        <Box className="bg-white rounded-lg shadow-lg text-def-t ">
            <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Skill</h3>
            <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
            <div className='px-6 py-3'>
                <div id="modal-description " className='mb-4 flex'>
                    Would you like to add a new Skill?
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <label  className='text-sm'>Skill Name</label>
                    <input onChange={handleChange} type='text' name='desc' placeholder='Skill Name' className='w-full py-2 px-2 border-2 rounded-md mb-2' />
                    <div className='flex'>  
                    <div className='flex-1'></div>
                    <div className=' cursor-pointer flex-none content-center mr-5 text-prc hover:underline' onClick={handleModal}>Cancel</div>
                    <button type='submit' className='mt-2 bg-prc rounded-md py-2 hover:bg-opacity-80 font-bold px-4 text-white'>Yes</button>
                    </div>
                </form>
            </div>
        </Box>
    </Modal>
    </> 

    )
}

function SkillWithLinks ({data}){
    return (
    <>
        <NavLink to={`${data.id}`} className='hover:bg-prc hover:bg-opacity-80 hover:text-white bg-white p-4 rounded-md flex-grow'>
            {data.desc}
        </NavLink>
    </>
    )
}