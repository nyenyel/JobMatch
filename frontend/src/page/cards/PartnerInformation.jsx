import { Box, Modal } from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { crud } from '../resource/api'
import Loading from './Loading'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function PartnerInformation({data}) {
    const {apiClient} = useContext(AppContext)
    const [loading, setLoading]= useState(false)
    const [modalIsOpen, setModalIsOpen]= useState(false)
    const handleModal = () => setModalIsOpen(!modalIsOpen)
    const nav = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const updateData =  async (e) =>{
            try{
                const response = await apiClient.post(crud.concat(`give-partnership/${data.id}`))
                console.log(response.data.data)
            } catch (e){
                console.log(e)
            } finally {
                setLoading(false)
                nav(0)
            }
        }
        updateData()
        handleModal()
    }
    return (
    <>
    {loading && (<Loading />)}
    <Modal open={modalIsOpen} onClose={handleModal}
            aria-labelledby="modal-title" aria-describedby="modal-description"
            className="flex z-30 justify-center items-center h-screen"
    >
        <Box className="bg-white rounded-lg shadow-lg text-def-t ">
            <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Partnership</h3>
            <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
            <div className='px-6 py-3'>
                <div id="modal-description " className='mb-4 flex'>
                    {data.partnered == null ? (
                        <>
                        Would you like to make a partnership with
                        </>
                    ): (
                        <>
                        Would you like to remove the partnership with
                        </>
                    )}
                   <div className='font-bold ml-2'> {data.title}?</div>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='flex'>  
                      <div className='flex-1'></div>
                      <div className=' cursor-pointer flex-none content-center mr-5 text-prc hover:underline' onClick={handleModal}>Cancel</div>
                      <button type='submit' className={`mt-2 ${data?.partnered == null ? 'bg-prc ' : 'bg-red-600'} rounded-md py-2 hover:bg-opacity-85 font-bold px-4 text-white`}>Yes</button>
                    </div>
                </form>
            </div>
        </Box>
    </Modal>
    <div className='bg-white flex p-4 h-44 rounded-lg text-text hover:bg-white hover:bg-opacity-80 cursor-pointer' onClick={handleModal}>
      <div className='flex-1'>
        <div className='font-bold text-xl'>{data.title}</div>
        <div className='font-base text-sm'>Owner: {data.owner.last_name}, {data.owner.first_name} </div>
        <div className='font-base text-sm content-center'>Statis: {data.verified ? 'Verified':'Pending'} </div>
        <div className='bg-black max-w-full h-0.5 bg-opacity-20 rounded-full my-2'></div>
        <div className='font-bold text-sm'>Description</div>
        <div className='font-base text-sm mb-2 truncate w-72'>
          {data.desc}
        </div>
        {data.partnered !=null && (
            <div className='flex-none text-center bg-prc text-white rounded-full px-5 py-1 text-xs font-bold'>Partnered</div>
        )}
      </div>
      <div className='flex-none flex flex-col items-center justify-center ml-4 p-4'>
        <div className='text-center text-4xl mb-2 font-bold flex'>{data.jobs?.length}</div>
        <div className='text-center'>Jobs</div>
      </div>
    </div>
    </>
    )
}
