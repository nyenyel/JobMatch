import React, { useContext, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Skill from '../cards/Skill'
import SkillComponent from './SkillComponent'
import { Box, Modal } from '@mui/material'
import axios from 'axios'
import { crud } from '../resource/api'
import ApplicantInformation from '../cards/ApplicantInformation'
import ApplicantProfileSummary from '../cards/ApplicantProfileSummary'
import { AppContext } from '../context/AppContext'
import ContactComponent from './ContactComponent'
import { Success } from '../cards/Warning'


export default function ApplicantSkillComponent() {
    const {user, apiClient} = useContext(AppContext)
    const navigate = useNavigate()
    const [applicantSkillForm, setApplicantSkillForm] = useState()
    const [apiResponse, setApiResponse] = useState()
    const [loading, setLoading] = useState(false)
    const [dataAdded, setDataAdded] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const handleModal = () => setModalIsOpen(!modalIsOpen)
    const handleAdded = () => setDataAdded(!dataAdded)

    const handleChange =  (e) => {
        const {name, value} = e.target
        setApplicantSkillForm({
            ...applicantSkillForm,
            [name]: value,
            lib_applicant_id: user?.data?.id,
            lib_profession_id: user?.data?.profession?.id,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await apiClient.post(crud.concat('applicant-skill'), applicantSkillForm, {
                    headers: {
                            'Content-Type': 'application/json'
                        }
                    })
            handleModal()
            handleAdded()
            // console.log(applicantSkillForm)
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
          } finally{
            setLoading(false)
            setTimeout(() => {
                setDataAdded(false)
            }, 3000)
        }
    }
    return (
        <>
        {dataAdded && 
            <div className=' absolute -ml-14 z-50 w-full flex cursor-pointer' onClick={handleAdded}>
                <div className='flex-1' />
                <div className='flex-none'>
                    <Success message={'Skill added succesfully!'}/>
                </div>
            </div>
        }
        <div className='flex'>
            <ApplicantProfileSummary />
            <div className='flex-1 ml-4'>
                <div className='flex'>
                    <div className='flex-1 bg-gradient-to-tr hover:opacity-80 drop-shadow from-prc to-[#c5f0d0] select-none p-4 rounded-md text-xl font-bold text-white cursor-pointer' onClick={handleModal}>
                        Add Skill
                    </div>
                    <div className='flex-1'/>
                </div>
                <div className='flex content-center items-center mt-2'>
                    <div className='  flex-none text-text text-sm mr-2 content-center'>My Skills</div>
                    <div className='bg-text h-0.5 flex-1 content-center bg-opacity-35'/>
                </div>
                <div className='flex gap-1 flex-wrap mt-2'>
                    {user?.data?.skill.map((item, index) => (
                        <Skill data={item} key={index} isApplicant={true}/>
                    ))}
                </div>
                <Modal open={modalIsOpen} onClose={handleModal}
                    aria-labelledby="modal-title" aria-describedby="modal-description"
                    className="flex z-30 justify-center items-center h-screen"
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
            </div>
            <div className='sticky h-full top-0 max-[1100px]:hidden'>
                <ContactComponent />
            </div>
        </div>
        </>
    )
}
