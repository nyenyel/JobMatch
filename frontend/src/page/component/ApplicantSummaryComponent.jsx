import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Skill from '../cards/Skill'
import { Experience } from '../cards/ApplicantProfileSummary'
import axios from 'axios'
import { crud, ruleBased } from '../resource/api'
import { AppContext } from '../context/AppContext'
import Loading from '../cards/Loading'
import { Box, Modal } from '@mui/material'
import { split } from 'postcss/lib/list'

export default function ApplicantSummaryComponent() {
    const location = useLocation()
    const {apiClient} = useContext(AppContext)
    const {applicantData, applicationID} = location.state || {}
    const [modal, setModal] = useState({ state: false, data: 0 });
    const [seconds, setSeconds] = useState(10);
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(true)
    const [percentage, setPercentage] = useState(null)
    const [display, setDisplay] = useState('')
    const [vissiility, setVissibility] = useState(true)

    // console.log(location)
    const path = location.pathname.split('/').filter(Boolean)

    const jobID = path[2]

    const handleModal = (data) => {
        getPercecnt()
        setModal((prevModal) => ({
            state: !prevModal.state,
            data: data,
        }));
        setSeconds(10)
        setVissibility(true)
        setDisplay('')
    };

    const navigate = useNavigate()
    
    const updateData = async (data)=> {
        try {
            const response = await apiClient.put(crud.concat(`update-application/${applicationID}`), {lib_status_id: data},{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate('/employer/Jobs')
            // console.log(response)
        } catch(error) {
            console.error(error.response)
        } finally { 
            setLoading(false)
        }
    }

    const getPercecnt = async () => {
        setLoading(true)
        const endpoint = ruleBased.concat(`get-percent/${applicantData?.id}/${jobID}`)
        try{
            const response = await apiClient.get(endpoint)
            setPercentage(response.data.percentage)
            console.log(response.data)
        } catch ( error  ) {
            console.error(response)
        } finally {
            setLoading(false)
        }
    }
    const handleSubmit = (des) => {
        setLoading(true)
        updateData(des)
    }

    useEffect(() => {
        if (modal.state && seconds > 0) {
            const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (seconds === 0) {
            setIsDisable(false)
            setDisplay(`${percentage}${'%'}`)
            setVissibility(false)
        }
    }, [modal.state, seconds]);

    return (
        <>   
        {loading && <Loading />}
        <Modal
            open={modal.state}
            onClose={() => handleModal(0)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="flex justify-center z-30 items-center h-screen"
        >
            <Box className="bg-white rounded-lg shadow-lg text-def-t">
                <h3 id="modal-title" className="font-semibold text-xl rounded-t-lg text-text px-6 pt-4">{modal.data === 1 ?'Accept' : 'Reject'} Applicant</h3>
                <div className="h-0.5 bg-prc rounded-xl mt-1 mx-6 max-w-40"></div>
                <div className="px-6 py-3">
                    <div id="modal-description" className="mb-4 flex">
                        Would you like to delete the {modal.data === 1 ?'accept' : 'reject'} this applicant?
                    </div>
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": seconds }} className={`${vissiility? '' : 'hidden'}`}>{seconds}</span>
                        {display}

                    </span>
                    <div>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(modal.data);
                    }} className="flex flex-col">
                        <div className="flex">
                            <div className="flex-1"></div>
                            <div className="cursor-pointer flex-none content-center mr-5 text-prc hover:underline" onClick={() => handleModal(0)}>Cancel</div>
                            <button type="submit" className={`mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white hover:bg-opacity-80`} disabled={isDisable}>{modal.data === 1 ?'Accept' : 'Reject'}</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>

        <div className='bg-white flex p-4 rounded-lg text-text mb-2 hover:bg-white hover:bg-opacity-80 cursor-pointer'>
            <div className=' flex-1'>
                <div className='font-bold text-xl'>{applicantData?.last_name}, {applicantData?.first_name}</div>
                <div className='font-base text-sm'>Profession: {applicantData?.profession?.desc}</div>
                <div className='bg-black max-w-80 h-0.5 bg-opacity-20 rounded-full my-2'></div>
                <div className='font-bold text-sm'>Description</div>
                <div className='font-base text-sm mb-2'>{applicantData?.desc}</div>
                <div className='font-bold text-sm'>Skills</div>
                <div className='flex flex-wrap pt-1 gap-1'>
                    {applicantData?.skill?.map((item, index) => (
                        <Skill key={index} data={item} />
                    ))}
                </div>
                <div className='font-bold text-sm mt-2'>Experience</div>
                <div className='flex flex-col flex-wrap pt-1 gap-1'>
                    {applicantData?.experience?.map((item, index) => (
                        <ExperienceSummary key={index} data={item} />
                    ))}
                </div>

                <div className='flex mt-2 gap-16'>
                    <div className='flex-none'>
                        <div className='font-bold text-sm '>Address</div>
                        <div className='font-base text-sm mb-2'>{applicantData?.address}</div>
                    </div>

                    <div className='flex-none'>
                        <div className='font-bold text-sm'>E-mail</div>
                        <div className='font-base text-sm mb-2'>{applicantData?.email}</div>
                    </div>

                    <div className='flex-none'>
                        <div className='font-bold text-sm'>Contact No.</div>
                        <div className='font-base text-sm mb-2'>{applicantData?.phone_no}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex gap-2 text-center mt-4 text-white font-bold'>
            <div onClick={() => handleModal(3)} className='flex-1 bg-red-700 rounded-md py-2 select-none cursor-pointer hover:bg-opacity-80'>Reject</div>
            <div onClick={() => handleModal(1)} className='flex-1 bg-prc rounded-md py-2 select-none cursor-pointer hover:bg-opacity-80'>Accept</div>
        </div>
        </>
    )
}

export function ExperienceSummary({data}){
    // console.log(data)
    return (
    <div className='flex'>
        <div className='w-0.5 bg-text bg-opacity-40 rounded-full mr-2 my-0.5'></div>
        <div className="flex flex-col ">
            <div className="font-semibold text-sm flex-none mr-1">{data?.title}</div>
            <div className="flex-1 text-sm">Profession: {data?.profession?.desc}</div>
            <div className="flex-1 text-sm">Duration: {data?.duration} year(s)</div>
            <div className="flex-1 text-sm">Description: {data?.desc} </div>
        </div>
    </div>
    )
}