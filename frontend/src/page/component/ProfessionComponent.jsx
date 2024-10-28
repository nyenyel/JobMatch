import React, { useContext, useEffect, useState } from 'react'
import Loading from '../cards/Loading'
import axios from 'axios'
import { crud } from '../resource/api'
import { NavLink } from 'react-router-dom'
import Redirect, { ApplicantRedirect, EmployerRedirect } from '../context/Redirect'
import { Box, Modal } from '@mui/material'
import { Success } from '../cards/Warning'
import { AppContext } from '../context/AppContext'

export default function ProfessionComponent() {
    const {apiClient} = useContext(AppContext)
    const [loading, setLoading] =useState(false)
    const [data, setData] =useState()
    const [message, setMessage] =useState(null)
    const [professionForm, setProfessionForm] =useState()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const handleModal = () => setModalIsOpen(!modalIsOpen)

    const handleChange = (e) => {
        const {name, value} = e.target
        setProfessionForm({
            ...professionForm,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const storeData = async () =>{
            try{
                const response = await apiClient.post(crud.concat('profession'), professionForm, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setMessage('Data Added')
            } catch (e) {
                console.log('Error' ,e)
            } finally {
                setLoading(false)
            }
        }
        storeData()
        handleModal()
        setTimeout(() => {
            setMessage(null); // Clears the message after 5 seconds
        }, 3000);
    } 
    useEffect (()=>{
        const getData = async (e) => {
            setLoading(true)
            try{
                const response = await apiClient.get(crud.concat('profession'))
                setData(response.data.data)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
        getData()

    }, [])
    return (
    <>
    {loading && (<Loading />)}
    <Redirect />
    <ApplicantRedirect />
    <EmployerRedirect />
    {message && (<Success message={message}/>)}
        <div className='text-2xl text-text font-bold'>Profession</div>
        <div className=' items-center flex '>
            <div className='bg-text flex-1 content-center h-0.5 bg-opacity-30'></div>
            <div className=' content-center bg-prc text-white px-5 py-1 select-none cursor-pointer hover:bg-opacity-70 ml-2 rounded-md' onClick={handleModal}>
                Add Profession
            </div>        
        </div>
        <div className='flex flex-wrap gap-2 mt-3'>
            {data?.map((item, index) => (
                <Profession key={index} data={item} />
            ))}
        </div>
        <Modal open={modalIsOpen} onClose={handleModal}
            aria-labelledby="modal-title" aria-describedby="modal-description"
            className="flex justify-center z-30 items-center h-screen"
        >
            <Box className="bg-white rounded-lg shadow-lg text-def-t ">
                <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Profession</h3>
                <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
                <div className='px-6 py-3'>
                    <div id="modal-description " className='mb-4 flex'>
                        Would you like to add a new Profession?
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <label  className='text-sm'>Profession Name</label>
                        <input onChange={handleChange} type='text' name='desc' placeholder='Profession Name' className='w-full py-2 px-2 border-2 rounded-md mb-2' />
                        <div className='flex'>  
                        <div className='flex-1'></div>
                        <div className=' cursor-pointer flex-none content-center mr-5 text-prc hover:underline' onClick={handleModal}>Cancel</div>
                        <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white hover:bg-opacity-80'>Yes</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    </>
    )
}

function Profession({data}){
    const handleDelete = async () => {
        console.log('delete')
    }
    return (
        <NavLink to={`${data.id}`} className="bg-white p-4 rounded-md w-full md:w-auto flex-grow hover:text-white hover:bg-opacity-70 hover:bg-prc select-none cursor-pointer">
            {data.desc}
        </NavLink>
    )
}