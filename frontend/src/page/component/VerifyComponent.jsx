import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { crud } from '../resource/api'
import Loading from '../cards/Loading'
import { Box, Modal } from '@mui/material'
import Redirect, { ApplicantRedirect, EmployerRedirect, RoleCheck } from '../context/Redirect'

export default function VerifyComponent() {
  const { token } = useContext(AppContext);
  const [toVerifyCompany, setToVerifyCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(crud.concat('to-verify-company'), {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setToVerifyCompany(response.data.data.application);
        console.log(response.data.data)
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
      <table className='rounded-t-md bg-prc text-white w-full text-left mt-2'>
        <thead className=''>
          <tr className=''>
            <th className='px-4 py-3'>Applicant</th>
            <th className='px-4 py-3'>Job Offer</th>
            <th className='px-4 py-3'>Employer</th>
            <th className='px-4 py-3'>Company</th>
            <th className='px-4 py-3'></th>
          </tr>
        </thead>
        <tbody className='bg-white text-black'>
          {toVerifyCompany?.map((item, index) => (
            <TableRow key={index} data={item}/>
          ))}
          <tr className='bg-prc rounded-b-md'>
            <td className='px-4 py-2'></td>
            <td className='px-4 py-2'></td>
            <td className='px-4 py-2'></td>
            <td className='px-4 py-2'></td>
            <td className='px-4 py-2'></td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  )
}

function TableRow(data) {
  const [message, setMessage] = useState({
    phone_no: data.data.applicant.phone_no,
    message: ''
  })
  
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const handleModal = () => setModalIsOpen(!modalIsOpen)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(message)
    handleModal()
  }
  const handleChange = (e) => {
    const {name, value} = e.target
    setMessage({
      ...message,
      [name]: value
    })
  }
  return (
    <>
    <Modal open={modalIsOpen} onClose={handleModal}
            aria-labelledby="modal-title" aria-describedby="modal-description"
            className="flex justify-center items-center h-screen"
    >
        <Box className="bg-white rounded-lg shadow-lg text-def-t ">
            <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Send SMS</h3>
            <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
            <div className='px-6 py-3'>
                <div id="modal-description " className='mb-4'>
                    Would you inform the acceptance of
                   <div className='font-bold'> Mr./Mrs. {data.data.applicant.last_name}, {data.data.applicant.first_name} ?</div>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div>
                      <textarea name='message' onChange={handleChange} className='border-2 p-3 w-full rounded-md' rows={5} cols={50} placeholder='Enter your message...'/>
                    </div>
                    <div className='flex'>  
                      <div className='flex-1'></div>
                      <div className=' cursor-pointer flex-none content-center mr-5 text-prc underline' onClick={handleModal}>Cancel</div>
                      <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white'>SEND</button>
                    </div>
                </form>
            </div>
        </Box>
    </Modal>
    <tr className=' border-b-2 border-prc border-opacity-10 hover:bg-black hover:bg-opacity-5'>
      <td className='px-4 py-2'>{data.data.applicant.last_name}, {data.data.applicant.first_name}</td>
      <td className='px-4 py-2'>{data.data.job.title}</td>
      <td className='px-4 py-2'>{data.data.job.employer.last_name}, {data.data.job.employer.first_name}</td>
      <td className='px-4 py-2'>{data.data.job.company.title}</td>
      <td className='px-4 py-2'><span className=" cursor-pointer icon-[tabler--message-filled] bg-prc w-7 h-7" onClick={handleModal}></span></td>
    </tr>
    </>
  )
}