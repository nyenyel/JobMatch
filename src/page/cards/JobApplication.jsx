import React, { useContext, useState } from 'react'
import Skill from './Skill'
import { AppContext } from '../context/AppContext'
import ProfessionLevel from './ProfessionLevel'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, Modal } from '@mui/material'
import { crud } from '../resource/api'


export default function JobApplication({data ,status}) {
  const {user, apiClient} = useContext(AppContext)
  const [modal, setModal] = useState(false)
  const [error, setError] = useState()
  const [review,setReview] =useState()
  const navigate =useNavigate()
  const handleModal = () => {
    if(status.id === 1)
    {
      setModal(!modal)
    }
  }
  const handleSubmit = async(e)=> {
    e.preventDefault()
    try{
      const response = await apiClient.post(crud.concat('review'), review)
      navigate(0)
    } catch (error) {
      console.error(error)
      setError(error.response.data.message)
    } 
  }
  const handleChange = (e) => {
    const {name, value}= e.target
    setReview({
      ...review,
      [name]: value,
      reviewed_by: user?.data.id,
      reviewed_for: data?.employer?.id
    })
  }
  return (
    <>
    <Modal open={modal} onClose={handleModal}
          aria-labelledby="modal-title" aria-describedby="modal-description"
      className="flex justify-center z-30 items-center h-screen"
    >
      <Box className="bg-white rounded-lg shadow-lg text-def-t ">
          <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Rating and Reviews</h3>
          <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
          <div className='px-6 py-3'>
              <div id="modal-description " className='mb-4 flex'>
                  Please give a rating and review to Mr. {data?.employer?.last_name}, {data?.employer?.first_name} {data?.employer?.middle_name.charAt(0)}. 
              </div>
              <div className='text-red-700 text-sm'>{error}</div>
              <form onSubmit={handleSubmit} className='flex flex-col'>
                  <div className='flex flex-col'> 
                  <label className='text-sm mb-2'>Rating</label>

                  <div className="flex flex-row-reverse justify-end items-center mb-2">
                    <input onChange={handleChange} id="rate-1" type="radio" className="peer -ms-5 size-10 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="rate" value="5"/>
                    <label htmlFor="rate-1" className="peer-checked:text-prc text-gray-300 pointer-events-none dark:peer-checked:text-prc dark:text-neutral-600">
                      <svg className="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                      </svg>
                    </label>
                    <input onChange={handleChange} id="rate-2" type="radio" className="peer -ms-5 size-10 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="rate" value="4"/>
                    <label htmlFor="rate-2" className="peer-checked:text-prc text-gray-300 pointer-events-none dark:peer-checked:text-prc dark:text-neutral-600">
                      <svg className="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                      </svg>
                    </label>
                    <input onChange={handleChange} id="rate-3" type="radio" className="peer -ms-5 size-10 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="rate" value="3"/>
                    <label htmlFor="rate-3" className="peer-checked:text-prc text-gray-300 pointer-events-none dark:peer-checked:text-prc dark:text-neutral-600">
                      <svg className="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                      </svg>
                    </label>
                    <input onChange={handleChange} id="rate-4" type="radio" className="peer -ms-5 size-10 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="rate" value="2"/>
                    <label htmlFor="rate-4" className="peer-checked:text-prc text-gray-300 pointer-events-none dark:peer-checked:text-prc dark:text-neutral-600">
                      <svg className="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                      </svg>
                    </label>
                    <input onChange={handleChange} id="rate-5" type="radio" className="peer -ms-5 size-10 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="rate" value="1"/>
                    <label htmlFor="rate-5" className="peer-checked:text-prc text-gray-300 pointer-events-none dark:peer-checked:text-prc dark:text-neutral-600">
                      <svg className="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                      </svg>
                    </label>
                  </div>
                  <label className='text-sm'>Review</label>

                  <textarea name='review'onChange={handleChange} style={{ resize: 'none' }} className='flex-1 w-full p-2 rounded-md border-2 border-opacity-20 border-prc '  placeholder='Say somthing about the Emlpoyer why your giving this rating' rows={5}/>
                  <div className='flex'>
                    <div className='flex-1' />
                    <div className=' cursor-pointer flex-none content-center mr-5 text-prc hover:underline' onClick={handleModal}>Cancel</div>
                    <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white hover:bg-opacity-80'>Send Review</button>
                  </div>
                  </div>
              </form>
          </div>
      </Box>
    </Modal>
    <div className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer' onClick={handleModal}>
        <div className=' flex-1'>
            <div className='font-bold text-xl'>{data?.title}</div>
            <div className='font-base text-sm'>Duration untill: {data?.post_duration}</div>
            <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
            <div className='font-bold text-sm'>Description</div>
            <div className='font-base text-sm mb-2'>{data?.desc}</div>
            <div className='font-bold text-sm'>Requirements</div>
            <div className='flex flex-wrap pt-1 gap-1 mb-2'>
                <ProfessionLevel data={data?.level?.desc}/>
                {data?.skill.map((item, index) => (
                  <Skill key={index} data={item}/>
                ))}
            </div>
        </div>
        <div className="flex-none  flex flex-col items-center justify-center p-4">
            <div className="text-center text-2xl mb-2 font-bold">{status?.desc}</div>
            <div className="text-center">Status</div>
        </div>
    </div>
    </>
  )
}
