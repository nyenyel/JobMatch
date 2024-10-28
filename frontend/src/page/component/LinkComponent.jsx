import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Redirect, { ApplicantRedirect, EmployerRedirect } from '../context/Redirect';
import Loading from '../cards/Loading';
import axios from 'axios';
import { crud } from '../resource/api';
import { Box, Modal } from '@mui/material';
import { AppContext } from '../context/AppContext';

export default function LinkComponent() {
    const {skillID} = useParams()
    const nav = useNavigate()
    const [data, setData] = useState()
    const [newLink, setNewLink] = useState()
    const [loading, setLoading] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {apiClient} = useContext(AppContext)
    const handleModal = () => setModalIsOpen(!modalIsOpen)
    const [editModal, setEditModal] = useState (false)
    const handleEditModal = () => setEditModal(!editModal)
    const [deleteModal, setDeleteModal] = useState (false)
    const [deleteId, setDeleteId] = useState (false)
    const handleDeleteModal = () => setDeleteModal(!deleteModal)
    
    const handleEditSubmit = (e) => {
        setLoading(true)
        const storeData = async () => {
            try {
                const response = await apiClient.put(crud.concat(`skill/${data?.id}`), newLink, {
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
                nav(0)

            }
        }
        storeData()
        handleEditModal()
        setTimeout(() => {
            setMessage(null)
        },[3000])
    }

    const handleDeleteId = (data) => {
        setDeleteId(data);
        console.log(data);
        handleDeleteModal();
    };

    const handleChange =  (e) => {
        const {name, value} = e.target
        setNewLink({
            ...newLink,
            [name]: value,
            lib_skill_id: data?.id,
            lib_skill_type_id: 1
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const storeData = async () => {
            try{
                const response = await apiClient.post(crud.concat('link'), newLink, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response)
            } catch (e) {
                console.log("error", e)
            } finally {
                setLoading(false)
                nav(0)

            }
        } 
        storeData()
        handleModal()
    }
    
    const handleDeleteSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(data)
        const storeData = async () => {
            try{
                const response = await apiClient.delete(crud.concat(`link/${deleteId}`), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response)
            } catch (e) {
                console.log("error", e)
            } finally {
                setLoading(false)
                nav(0)

            }
        } 
        storeData()
        handleDeleteModal()

    }
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try{
                const response = await apiClient.get(crud.concat(`skill/${skillID}`))
                setData(response.data.data)
            } catch (e){
                console.log('Error', e)
            } finally {
                setLoading(false)  
            }
        }
        getData()
    }, [skillID])

    return (
        <>
        <Redirect />
        <ApplicantRedirect />
        <EmployerRedirect />
        {loading && (<Loading />)}
        <div className='bg-white p-4 ml-3 rounded-md min-w-72 max-w-96'>
            <div className='flex'>
                <div onClick={handleEditModal} className=' content-center flex mt-2 mr-1 rounded-md cursor-pointer hover:bg-opacity-70'>
                    <span className="icon-[fluent--edit-20-filled] bg-yellow-500 w-4 h-4 "></span>
                </div>
                <div className='font-semibold text-lg flex-none content-center'>
                    {data?.desc}
                </div>
                <div className='flex-1' />
                <div className='content-center underline cursor-pointer' onClick={handleModal}>New link</div>
            </div>
            <div className='w-full h-0.5 bg-text bg-opacity-30'></div>
            <ul className='underline mt-2'>
                {data?.links.map((item, index) => (
                    <li key={index} className='truncate flex'>
                        <div 
                            onClick={() => handleDeleteId(item.id)} // Remove `e` parameter here
                            className='content-center flex mt-1 mr-1 rounded-md cursor-pointer hover:bg-opacity-70'
                        >
                            <span className="icon-[ic--round-delete] bg-red-700 w-4 h-4"></span>
                        </div>
                        {item.link}
                    </li>
                ))}
            </ul>
        </div>

        <Modal open={deleteModal} onClose={handleDeleteModal}
            aria-labelledby="modal-title" aria-describedby="modal-description"
            className="flex justify-center z-30 items-center h-screen"
        >
            <Box className="bg-white rounded-lg shadow-lg text-def-t ">
                <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Link</h3>
                <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
                <div className='px-6 py-3'>
                    <div id="modal-description " className='mb-4 flex'>
                        Would you like to delete the selected link?
                    </div>
                    <form onSubmit={handleDeleteSubmit} className='flex flex-col'>
                        <div className='flex'>  
                        <div className='flex-1'></div>
                        <div className=' cursor-pointer flex-none content-center mr-5 text-prc hover:underline' onClick={handleDeleteModal}>Cancel</div>
                        <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white hover:bg-opacity-80'>Delete</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>


        <Modal open={editModal} onClose={handleEditModal}
        aria-labelledby="modal-title" aria-describedby="modal-description"
        className="flex justify-center z-30 items-center h-screen"
        >
            <Box className="bg-white rounded-lg shadow-lg text-def-t ">
                <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Skill</h3>
                <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
                <div className='px-6 py-3'>
                    <div id="modal-description " className='mb-4 flex'>
                        Would you like to update {data?.desc}?
                    </div>
                    <form onSubmit={handleEditSubmit} className='flex flex-col'>
                        <label  className='text-sm'>Skill Name</label>
                        <input onChange={handleChange} type='text' name='desc' placeholder='Skill Name' className='w-full py-2 px-2 border-2 rounded-md mb-2' />
                        <div className='flex'>  
                        <div className='flex-1'></div>
                        <div className=' cursor-pointer flex-none content-center mr-5 text-prc hover:underline' onClick={handleEditModal}>Cancel</div>
                        <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white hover:bg-opacity-80'>Update</button>
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
                <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Link</h3>
                <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
                <div className='px-6 py-3'>
                    <div id="modal-description " className='mb-4 flex'>
                        Would you like to add a new Link?
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <label  className='text-sm'>URL</label>
                        <input onChange={handleChange} type='text' name='link' placeholder='URL' className='w-full py-2 px-2 border-2 rounded-md mb-2' />
                        <div className='flex'>  
                        <div className='flex-1'></div>
                        <div className=' cursor-pointer flex-none content-center mr-5 text-prc underline' onClick={handleModal}>Cancel</div>
                        <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white'>Yes</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
        </>
    )
}
