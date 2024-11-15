import React, { useContext, useEffect, useState } from 'react'
import Loading from '../cards/Loading'
import { AppContext } from '../context/AppContext'
import { Navigate, NavLink } from 'react-router-dom'
import JobInformation from '../cards/JobInformation'
import abstract from '../../assets/icon.png'
import meeting from '../../assets/meeting.jpg'
import axios from 'axios'
import { crud } from '../resource/api'
import Logo, { Badge } from '../cards/Logo'
import ParnterJob from '../cards/ParnterJob'
import bg from '../../assets/custom-bg.png'
import bg_two from '../../assets/bg.png'

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
    <div className='flex flex-col text-text '
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover', // Optional: Make the image cover the entire div
        backgroundPosition: 'center', // Optional: Center the image
      }}>
      <div className='flex flex-row gap-2 max-[1100px]:px-5 px-28 bg-white rounded-br-full drop-shadow-lg'
        style={{
          backgroundImage: `url(${bg_two})`,
          backgroundSize: 'cover', // Optional: Make the image cover the entire div
          backgroundPosition: 'center', // Optional: Center the image
        }}>

        <div className='flex-1 content-center max-[1100px]:py-32'>
          {/* <div className='flex'>
            <div className='p-2 rounded-lg border-2 border-prc flex-none'>
              <Logo /> 
            </div>
          </div> */}
          <div className='text-2xl font-bold mt'>JobMatch!</div>
          <div className='text-sm w-96 mb-4'>
          Unlock your full potential and discover the job that fits your skills perfectly. If you're just starting, 
          looking for a new job, hobbies and oppurtunities, find your perfect job today and embark on a journey to a fulfilling career!
          </div>
          <div className='flex gap-2 flex-row drop-shadow'>
            <NavLink to={`register/applicant`} className='bg-prc text-white px-4 py-2 rounded'>Find A Job</NavLink>
            <NavLink to={`register/employer`} className='bg-prc text-white px-4 py-2 rounded'>Be A Employer</NavLink>
          </div>
          <div className='font-sans font-normal opacity-70 text-xs mb-5 mt-1 flex'>
              Already have an acount?
              <NavLink to={'/login'} className='ml-1 text-blue-700 underline'>Login</NavLink>
          </div>
        </div>
        <div className='py-32 pr-32 flex gap-10 max-[1100px]:hidden'>
          <img alt='abstract ' src={abstract} className=' h-60 ' />
          {/* <img alt='abstract' src={abstract} className='h-40 opacity-0' /> */}
        </div>
      </div>

      {/* Background with the meeting image */}
      <div className='flex max-[1100px]:px-5 px-28 max-[1100px]:flex-col'>
        <div className='-mt-14 w-72 rounded-md'>
          {/* Apply meeting.jpg as background */}
          <div className='bg-cover bg-center bg-no-repeat h-40 drop-shadow-lg rounded-t-md' style={{ backgroundImage: `url(${meeting})` }}>
            {/* Overlay content */}
            <div className="bg-white/75 py-4 px-2 rounded-t-md"/>
          </div>
          <div className='bg-prc px-5 py-10 text-white'>
            Discover your perfect job, that fits with your expertise. Job match where your skills define your path and journey.
          </div>
          <div className='max-[1100px]:hidden'>
            <div className='bg-prc p-9 mt-10 rounded-full'></div>
            <div className='bg-prc p-7 mt-2 mx-10 rounded-full'></div>
            <div className='bg-prc p-6 mt-2 mx-32 rounded-full'></div>
          </div>
        </div>
        <div className='flex-1 py-10 min-[1100px]:px-40 bg-white bg-opacity-20'>
          <div className='text-2xl font-bold mb-2'>Partnered Job</div>
          {data?.map((item, index) => (
          <NavLink to={`/applicant/jobs/${item.id}`} className='opacity-100 drop-shadow-lg' key={index}>
            <ParnterJob isNotAdmin={true} data={item}></ParnterJob>
          </NavLink>
          ))}
        </div>
      </div>
    </div>
</>
  )
}
