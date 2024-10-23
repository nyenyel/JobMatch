import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import AdminProfileSummary from '../cards/AdminProfileSummary'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { crud } from '../resource/api'
import Loading from '../cards/Loading'
import Redirect, { ApplicantRedirect, EmployerRedirect, RoleCheck } from '../context/Redirect'

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
  return (
    <>
    <tr className='border-b-2 hover:bg-black hover:bg-opacity-5 select-none'>
      <td className='pl-5 py-3'>{data.id}</td>
      <td>{data.first_name}, {data.last_name}</td>
      <td>{data.address}</td>
      <td>{data.gender.desc}</td>
      <td>{data.role.desc}</td>
      <td>
        <span className="icon-[fluent--edit-20-filled] bg-prc w-6 h-6 cursor-pointer mr-3 hover:bg-opacity-70"></span>
        <span className="icon-[ic--round-delete] bg-red-600 w-6 h-6 cursor-pointer hover:bg-opacity-70"></span>
      </td>
    </tr>
    </>
  )
}