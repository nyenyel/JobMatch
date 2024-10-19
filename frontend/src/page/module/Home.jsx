import React, { useContext } from 'react'
import Loading from '../cards/Loading'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'
import JobInformation from '../cards/JobInformation'

export default function Home() {
  const {role} = useContext(AppContext)

  return (
    <div className='flex flex-col text-text'>
      <div className='flex flex-col gap-2 py-48 px-28 bg-white '>
        <div className='text-2xl font-bold'>JobMatch</div>
        <div className='text-sm w-96 mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin libero lorem, scelerisque ut aliquet a, maximus eget libero. Vestibulum eget ante id urna sodales sollicitudin. Nam fringilla facilisis vulputate. </div>
        <div className='flex gap-2 flex-row drop-shadow'>
          <div className='bg-prc text-white px-4 py-2 rounded'>Find A Job</div>
          <div className='bg-prc text-white px-4 py-2 rounded'>Be A Employer</div>
        </div>
      </div>
      <div className='flex px-28'>
        <div className='-mt-14 border w-72'>
          <div className='bg-white py-10 px-2'>Image</div>
          <div className='bg-prc px-5 py-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin libero lorem, scelerisque ut aliquet a, maximus eget libero</div>
          <div className='bg-prc p-9 mt-10 rounded-full'></div>
          <div className='bg-prc p-7 mt-2 mx-10 rounded-full'></div>
          <div className='bg-prc p-6 mt-2 mx-32 rounded-full'></div>
        </div>
        <div className=' flex-1 py-10 px-40'>
          <div className='text-2xl font-bold mb-2'>Partnered Job</div>
          <JobInformation ></JobInformation>
          <JobInformation ></JobInformation>
          <JobInformation ></JobInformation>
          <JobInformation ></JobInformation>
        </div>
      </div>
    </div>
  )
}
