import React, { useContext, useEffect, useState } from 'react'
import Loading from '../cards/Loading'
import { AppContext } from '../context/AppContext'
import { Navigate, NavLink } from 'react-router-dom'
import JobInformation from '../cards/JobInformation'
import abstract from '../../assets/abs.png'
import meeting from '../../assets/meeting.jpg'
import axios from 'axios'
import { crud } from '../resource/api'
import Logo, { Badge } from '../cards/Logo'
import ParnterJob from '../cards/ParnterJob'

export default function Home() {
  const {role, apiClient} = useContext(AppContext)
  const [loading, setLoading] =useState(false)
  const [data, setData] = useState() 
  const getData = async () => {
    try{
      setLoading(true)
      const response = await apiClient.get(crud.concat('partnered-job'))
      setData(response.data.data)
    } catch (error) {
      console.error("Error: ",error.response)
    } finally {
      setLoading(false)
    }
  }
  useEffect (() => {
    getData()
  }, [])
  return (
    <>
    <div className='flex flex-col text-text'>
      <div className='flex flex-row gap-2 px-28 bg-gradient-to-bl from-white via-white to-prc/5 rounded-br-full'>
        <div className='flex-1 content-center'>
          {/* <div className='flex'>
            <div className='p-2 rounded-lg border-2 border-prc flex-none'>
              <Logo /> 
            </div>
          </div> */}
          <div className='text-2xl font-bold mt'>JobMatch</div>
          <div className='text-sm w-96 mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin libero lorem, scelerisque ut aliquet a, maximus eget libero. Vestibulum eget ante id urna sodales sollicitudin. Nam fringilla facilisis vulputate.</div>
          <div className='flex gap-2 flex-row drop-shadow'>
            <NavLink to={`register/applicant`} className='bg-prc text-white px-4 py-2 rounded'>Find A Job</NavLink>
            <NavLink to={`register/employer`} className='bg-prc text-white px-4 py-2 rounded'>Be A Employer</NavLink>
          </div>
          <div className='font-sans font-normal opacity-70 text-xs mb-5 mt-1 flex'>
              Already have an acount?
              <NavLink to={'/login'} className='ml-1 text-blue-700 underline'>Login</NavLink>
          </div>
        </div>
        <div className='py-32 pr-4 flex gap-10'>
          <img alt='abstract' src={abstract} className='h-96 rotate-90' />
          <img alt='abstract' src={abstract} className='h-64' />
        </div>
      </div>

      {/* Background with the meeting image */}
      <div className='flex px-28'>
        <div className='-mt-14 border w-72 rounded-md'>
          {/* Apply meeting.jpg as background */}
          <div className='bg-cover bg-center bg-no-repeat h-40 rounded-t-md' style={{ backgroundImage: `url(${meeting})` }}>
            {/* Overlay content */}
            <div className="bg-white/75 py-4 px-2 rounded-t-md"/>
          </div>
          <div className='bg-prc px-5 py-10 text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin libero lorem, scelerisque ut aliquet a, maximus eget libero</div>
          <div className='bg-prc p-9 mt-10 rounded-full'></div>
          <div className='bg-prc p-7 mt-2 mx-10 rounded-full'></div>
          <div className='bg-prc p-6 mt-2 mx-32 rounded-full'></div>
        </div>
        <div className='flex-1 py-10 px-40'>
          <div className='text-2xl font-bold mb-2'>Partnered Job</div>
          {data?.map((item, index) => (
          <NavLink to={`/applicant/jobs/${item.id}`} className='opacity-70' key={index}>
            <ParnterJob isNotAdmin={true} data={item}></ParnterJob>
          </NavLink>
          ))}
        </div>
      </div>
    </div>
</>
  )
}
