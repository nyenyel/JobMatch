import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import AdminProfileSummary from '../cards/AdminProfileSummary'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { auth, crud } from '../resource/api'
import Loading from '../cards/Loading'
import Redirect, { ApplicantRedirect, EmployerRedirect, RoleCheck } from '../context/Redirect'
import { Box, Modal } from '@mui/material'

export default function AccountComponent() {
  const {token ,role, apiClient} = useContext(AppContext)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    setLoading(true)
    const getData = async () =>{
      try{
        const response = await apiClient.get(crud.concat('user'), {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        setData(response.data.data)
      } catch(error){
        console.log('Error: ', error)
      } finally {
        setLoading(false)
      } 
    }
    getData()
  }, [])
  return (
    <>
    <Redirect />
    <EmployerRedirect />
    <ApplicantRedirect />
    {loading && (<Loading />)}
    <div>
      <AdminProfileSummary />
      <div className='bg-white rounded-md mt-5'>
        <div className='flex '>
          <div className='px-5 pt-4 pb-3 font-bold text-text text-lg flex-1 content-center'>Accounts</div>
          <div className='content-center px-5 pt-4 pb-3 font-semibold text-sm'>
            <div className=' border-b-2 border-text px-6 py-2 hover:rounded-md text-text cursor-pointer hover:bg-black hover:bg-opacity-5 hover:scale-101 '>
              New Account
            </div>
          </div>
        </div>
        <table className='w-full'>
          <thead className='bg-prc text-white font-bold '>
            <tr>
              <td className='pl-5 py-3'>Account ID</td>
              <td>Name</td>
              <td>Address</td>
              <td>Gender</td>
              <td>Account Type</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <TableRow key={index} data={item}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

function TableRow ({data}) {
  const nav = useNavigate()
  const {apiClient} = useContext(AppContext)
  const [loading, setLoading]= useState(false)
  const [deleteModal, setDeleteModal] = useState (false)
  const handleDeleteModal = () => setDeleteModal(!deleteModal)
  
  const handleBan = async(e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const response = await apiClient.put(auth.concat(`ban/${data?.id}`))
      console.log(response)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      nav(0)
    }
  } 
  return (
    <>
    <tr className='border-b-2 hover:bg-black hover:bg-opacity-5 select-none'>

    {loading && <Loading />}
    <Modal open={deleteModal} onClose={handleDeleteModal}
        aria-labelledby="modal-title" aria-describedby="modal-description"
        className="flex justify-center z-30 items-center h-screen"
    >
      <Box className="bg-red-200 rounded-lg shadow-lg text-def-t ">
          <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Account</h3>
          <div className='h-0.5 bg-red-700 rounded-xl  mt-1 mx-6 max-w-40' ></div>
          <div className='px-6 py-3'>
              <div id="modal-description " className='mb-4 flex'>
                  Would you like to delete/ban the selected Account?
              </div>
              <form onSubmit={handleBan} className='flex flex-col'>
                  <div className='flex'>  
                  <div className='flex-1'></div>
                  <div className=' cursor-pointer flex-none content-center mr-5 text-prc hover:underline' onClick={handleDeleteModal}>Cancel</div>
                  <button type='submit' className='mt-2 bg-red-700 rounded-md py-2 font-bold px-4 text-white hover:bg-opacity-80'>Delete/Ban</button>
                  </div>
              </form>
          </div>
      </Box>
    </Modal>
      <td className='pl-5 py-3'>{data.id}</td>
      <td>{data.first_name}, {data.last_name}</td>
      <td>{data.address}</td>
      <td>{data.gender.desc}</td>
      <td>{data.role.desc}</td>
      <td>
        <NavLink to={`${data?.id}`} className="icon-[fluent--edit-20-filled] bg-prc w-6 h-6 cursor-pointer mr-3 hover:bg-opacity-70"></NavLink>
        <span onClick={handleDeleteModal} className="icon-[ic--round-delete] bg-red-600 w-6 h-6 cursor-pointer hover:bg-opacity-70"></span>
      </td>
    </tr>
    </>
  )
}