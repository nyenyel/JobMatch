import React, { useContext, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Skill from '../cards/Skill'
import SkillComponent from './SkillComponent'
import { Box, Modal } from '@mui/material'
import axios from 'axios'
import { crud } from '../resource/api'
import { AppContext } from '../context/AppContext'

export default function JobSkillComponent() {
    const data = useOutletContext()
    const {apiClient} = useContext(AppContext)
    const navigate = useNavigate()
    const [jobSkillForm, setJobSkillForm] = useState()
    const [apiResponse, setApiResponse] = useState()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const handleModal = () => setModalIsOpen(!modalIsOpen)
    const handleChange =  (e) => {
        const {name, value} = e.target
        setJobSkillForm({
            ...jobSkillForm,
            [name]: value,
            job_id: data?.id,
            lib_profession_id: data?.profession?.id,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await apiClient.post(crud.concat('job-skill'), jobSkillForm, {
                    headers: {
                            'Content-Type': 'application/json'
                        }
                    })
            console.log(jobSkillForm)
            navigate(0)
        } catch (error) {
            if (error.response) {
              setApiResponse(error.response.data.errors)
              console.error('Error Response Data:', error.response.data);
              console.error('Error Response Status:', error.response.status);
              console.error('Data:', bannerForm);
            } else if (error.request) {
              console.error('Error Request:', error.request);
            } else {
              console.error('Error Message:', error.message);
            }
          }
          console.log(jobSkillForm)
        }
        // console.log(data)
    return (
        <>
        <div className='flex'>
            <div className='flex-1 bg-gradient-to-tr hover:scale-101 drop-shadow from-prc to-[#c5f0d0] select-none p-4 rounded-md text-xl font-bold text-white cursor-pointer' onClick={handleModal}>
                Add Required Skill
            </div>
            <div className='flex-1'/>
        </div>
        <div className='flex content-center items-center mt-2'>
            <div className='  flex-none text-text text-sm mr-2 content-center'>List of Required Skills</div>
            <div className='bg-text h-0.5 flex-1 content-center bg-opacity-35'/>
        </div>
        <div className='flex gap-1 flex-wrap mt-2'>
            {data?.skill.map((item, index) => (
                <Skill data={item} key={index} isEmployer={true}/>
            ))}
        </div>
        <Modal open={modalIsOpen} onClose={handleModal}
            aria-labelledby="modal-title" aria-describedby="modal-description"
            className="flex justify-center items-center h-screen"
        >
            <Box className="bg-white rounded-lg shadow-lg text-def-t ">
                <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Skill</h3>
                <div className='h-0.5 bg-prc rounded-xl  mt-1 mx-6 max-w-40' ></div>
                <div className='px-6 py-3'>
                    <div id="modal-description " className='mb-4 flex'>
                        Would you like to add a new Skill?
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <label  className='text-sm'>Skill Name</label>
                        <input onChange={handleChange} type='text' name='desc' placeholder='Skill' className='w-full py-2 px-2 border-2 rounded-md ' />
                        {apiResponse?.desc && (<div className='text-red-600 font-thin text-opacity-75 text-sm'>{apiResponse?.desc}</div>)}
                        <div className='flex'>  
                        <div className='flex-1'></div>
                        <div className=' cursor-pointer flex-none content-center mr-5 text-prc underline' onClick={handleModal}>Cancel</div>
                        <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white'>Add</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
        </>
    )
}
