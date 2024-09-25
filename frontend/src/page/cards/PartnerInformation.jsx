import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'

export default function PartnerInformation({data}) {
    const [modalIsOpen, setModalIsOpen]= useState(false)
    const handleModal = () => setModalIsOpen(!modalIsOpen)
    const handleChange = (e) => handleModal()
    const handleSubmit = (e) => {
        e.preventDefault()
        handleModal()
    }
    console.log(data)
    return (
    <>
    <Modal open={modalIsOpen} onClose={handleModal}
            aria-labelledby="modal-title" aria-describedby="modal-description"
            className="flex justify-center items-center h-screen"
    >
        <Box className="bg-white rounded-lg shadow-lg text-def-t ">
            <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Partnership</h3>
            <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
            <div className='px-6 py-3'>
                <div id="modal-description " className='mb-4 flex'>
                    Would you like to make a partnership with
                   <div className='font-bold ml-2'> {data.title}?</div>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                   
                    <div className='flex'>  
                      <div className='flex-1'></div>
                      <div className=' cursor-pointer flex-none content-center mr-5 text-prc underline' onClick={handleModal}>Cancel</div>
                      <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white'>Yes</button>
                    </div>
                </form>
            </div>
        </Box>
    </Modal>
    <div className='bg-white flex p-4 h-44 rounded-lg text-text hover:bg-white hover:bg-opacity-80 cursor-pointer' onClick={handleModal}>
      <div className='flex-1'>
        <div className='font-bold text-xl'>{data.title}</div>
        <div className='font-base text-sm'>Owner name: {data.owner.last_name}, {data.owner.first_name} </div>
        <div className='bg-black max-w-full h-0.5 bg-opacity-20 rounded-full my-2'></div>
        <div className='font-bold text-sm'>Description</div>
        <div className='font-base text-sm mb-2 truncate w-72'>
          {data.desc}
        </div>

        <div className='flex-none text-center bg-prc text-white rounded-full px-5 py-1 text-xs font-bold'>Partnered</div>
      </div>
      <div className='flex-none flex flex-col items-center justify-center ml-4 p-4'>
        <div className='text-center text-4xl mb-2 font-bold flex'>12</div>
        <div className='text-center'>Jobs</div>
      </div>
    </div>
    </>
    )
}
