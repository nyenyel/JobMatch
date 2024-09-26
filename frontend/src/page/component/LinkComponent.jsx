import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Redirect, { ApplicantRedirect, EmployerRedirect } from '../context/Redirect';
import Loading from '../cards/Loading';
import axios from 'axios';
import { crud } from '../resource/api';
import { Box, Modal } from '@mui/material';

export default function LinkComponent() {
    const {skillID} = useParams()
    const [data, setData] = useState()
    const [newLink, setNewLink] = useState()
    const [loading, setLoading] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const handleModal = () => setModalIsOpen(!modalIsOpen)
    const handleChange =  (e) => {
        const {name, value} = e.target
        setNewLink({
            ...newLink,
            [name]: value,
            lib_skill_id: data?.id
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const storeData = async () => {
            try{
                const response = await axios.post(crud.concat('link'), newLink, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response)
            } catch (e) {
                console.log("error", e)
            } finally {
                setLoading(false)
            }
        } 
        storeData()
        handleModal()
    }
    
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try{
                const response =await axios.get(crud.concat(`skill/${skillID}`))
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

                <div className='font-semibold text-lg flex-1'>
                    {data?.desc}
                </div>
                <div className='content-center underline cursor-pointer' onClick={handleModal}>New link</div>
            </div>
            <div className='w-full h-0.5 bg-text bg-opacity-30'></div>
            <ul className='underline mt-2'>
                {data?.links.map((item, index) => (
                    <li key={index} className=' truncate'>{item.link}</li>
                ))}
            </ul>
        </div>
        <Modal open={modalIsOpen} onClose={handleModal}
            aria-labelledby="modal-title" aria-describedby="modal-description"
            className="flex justify-center items-center h-screen"
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
