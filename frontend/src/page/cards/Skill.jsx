import { Box, Modal } from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { crud } from '../resource/api'
import { AppContext } from '../context/AppContext'

export default function Skill({data , isEmployer = false, isApplicant = false}) {
  const navigate = useNavigate()
  const {apiClient} = useContext(AppContext)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const handleModal = () => setModalIsOpen(!modalIsOpen)
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
        if(isEmployer){
          const response = await apiClient.delete(crud.concat(`job-skill/${data.id}`))
        }else if (isApplicant){
          const response = await apiClient.delete(crud.concat(`applicant-skill/${data.id}`))
        }
        navigate(0)
    }catch (error) {
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
        console.error('Data:', bannerForm);
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
    }
  }
    
  // console.log(data)
  return (
    <>
    {isEmployer || isApplicant ? (
    <>
    <div className='flex-grow flex bg-text text-white rounded-full px-5 py-2 text-xs font-bold'>
      <div className='flex-1 content-center'>{data?.skill?.desc}</div>
      <div onClick={handleModal} className='content-center bg-white pb-1 font-light px-2  rounded-full bg-opacity-20 cursor-pointer hover:scale-95'>x</div>
    </div>
    <Modal open={modalIsOpen} onClose={handleModal}
            aria-labelledby="modal-title" aria-describedby="modal-description"
            className="flex justify-center items-center h-screen"
    >
        <Box className="bg-white rounded-lg shadow-lg text-def-t ">
            <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Remove</h3>
            <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
            <div className='px-6 py-3'>
                <div id="modal-description " className='mb-4 flex'>
                    Would you like to remove this skill?
                </div>
                <form onSubmit={handleSubmit} className='flex flex-row'>
                    <div className='flex-1'/>
                    <div className=' cursor-pointer flex-none content-center mr-5 text-prc underline' onClick={handleModal}>Cancel</div>
                    <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white'>Yes</button>
                </form>
            </div>
        </Box>
    </Modal>
    </>
    ):(
    <div className='flex-grow bg-text text-white rounded-full px-5 py-1 text-xs font-bold'>
      <div className='flex-1 content-center'>{data?.skill?.desc}</div>
    </div>
    )}
    
    </>
  )
}
