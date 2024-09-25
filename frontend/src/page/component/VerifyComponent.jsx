import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { crud } from '../resource/api'
import Loading from '../cards/Loading'
import { Box, Modal } from '@mui/material'
import Redirect, { ApplicantRedirect, EmployerRedirect, RoleCheck } from '../context/Redirect'
import { Success } from '../cards/Warning'

export default function VerifyComponent() {
  const { token } = useContext(AppContext);
  const [toVerifyCompany, setToVerifyCompany] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(crud.concat('to-verify-company'))
        setToVerifyCompany(response.data.data);
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setLoading(false);
      }
    }; 
    getData();
  }, [token]);  
  return (
    <>
    <Redirect/>
    <EmployerRedirect />
    <ApplicantRedirect />
    {loading && (<Loading />)}
    <div className=''>
      <div className='text-text text-xl font-bold'>Verify Company</div>
      <div className=' grid grid-cols-1 gap-2'>
        {toVerifyCompany?.map((item, index) => (
          <CompanyToVerify key={index} data={item}/>
        ))}
      </div>
    </div>
    </>
  )
}

function CompanyToVerify({data}) {
  const [loading, setLoading] = useState(false);
  const [message,setMessage] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [verifyModalIsOpen, setVerifyModalIsOpen] = useState(false);
  
  const handleVerifyModal = () => setVerifyModalIsOpen(!verifyModalIsOpen) 
  const [selectedImage, setSelectedImage] = useState(null);
  // Function to toggle the modal and display the selected image
  const openImageModal = (img) => {
    setSelectedImage(img);
    setModalIsOpen(true);
  };

  // Function to close the modal
  const handleModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const storeData = async (e) => {
      try{
        const response = await axios.post(crud.concat(`notify-owner/${data?.id}`),{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        setMessage(response.data.message)
      } catch(e) {
        console.log('Error', e)
      } finally {
        setLoading(false)

      }
    }
    storeData()
    handleVerifyModal()
    setTimeout(() => {
      setMessage(null); // Clears the message after 5 seconds
    }, 3000);
  }
  return (
    <>
    {loading && (<Loading />)}
    {message && (<Success message={message}/>)}
      <div className='bg-white h-full flex p-4 mt-2  rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80'>
        <div className='flex-1'>
          <div className='font-bold text-xl'>{data.title}</div>
          <div className='font-base text-sm'>
            Owner: {data.owner.last_name}, {data.owner.first_name}
          </div>
          <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
          <div className='font-bold text-sm'>Description</div>
          <div className='font-base text-sm mb-2'>{data.desc}</div>
          <div className='font-bold text-sm'>Proof of Company</div>
          <div className='grid grid-cols-3'>
            {data.image?.map((item, index) => (
              <div key={index} className="w-full h-96">
                <img
                  src={item.img}
                  className="object-cover w-full h-full cursor-pointer border-2"
                  alt={`Proof ${index}`}
                  onClick={() => openImageModal(item.img)} // Open modal on click
                />
              </div>
            ))}
          </div>
          <div className='bg-prc mt-4  cursor-pointer text-white text-center py-2 rounded-md' onClick={handleVerifyModal}>Verify</div>
        </div>
      </div>

      {/* Modal for full-screen image */}
      <Modal
        open={modalIsOpen}
        onClose={handleModal}
        className="flex justify-center items-center"
      >
        <div className="w-full h-full bg-black bg-opacity-90 flex justify-center items-center" onClick={handleModal}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full-screen"
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={handleModal} // Close modal on click
            />
          )}
        </div>
      </Modal>

      <Modal open={verifyModalIsOpen} onClose={handleVerifyModal} aria-labelledby="modal-title" aria-describedby="modal-description"
             className="flex justify-center items-center h-screen">
        <Box className="bg-white rounded-lg shadow-lg text-def-t">
          <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Verify</h3>
          <div className='h-0.5 bg-prc rounded-xl mt-1 mx-6 max-w-40'></div>
          <div className='px-6 pb-3 pt-1 '>
            <div id="modal-description" className='mb-4 flex '>
              Would you like to verify the Company 
              <div className='mx-1 font-bold'>{data.title}</div>
              and notify them through SMS
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              
              <div className='flex'>  
                <div className='flex-1'></div>
                <div className='cursor-pointer flex-none content-center mr-5 text-prc underline' onClick={handleModal}>Cancel</div>
                <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white'>Yes</button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>

  )
}