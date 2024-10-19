import React, { useContext, useEffect, useState } from 'react'
import Redirect, { AdminRedirect, EmployerRedirect } from '../context/Redirect'
import EmployerProfileSummary from '../cards/EmployerProfileSummary'
import JobInformation from '../cards/JobInformation'
import { AppContext } from '../context/AppContext'
import ApplicantProfileSummary from '../cards/ApplicantProfileSummary'
import axios from 'axios'
import { ruleBased } from '../resource/api'
import ApplicantJobInformation from '../cards/ApplicantJobInformation'

export default function JobListComponent() {
  const { user, token } = useContext(AppContext); // Get user and token from context
  const [jobs, setJobs] = useState(null); // State to store the job recommendations
  const [error, setError] = useState(null); // State to store errors if any

  const getRecommendation = async () => {
    try {
      const response = await axios.get(ruleBased.concat(`recommend/${user?.data.id}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setJobs(response.data); // Make sure to set the correct data here
    } catch (error) {
      setError(error); // Set the error to state
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      getRecommendation();
      // console.log(jobs) // Call the function when the user is defined
      // console.log(user) // Call the function when the user is defined
    }
  }, [user, token]);

  const handleChange = (e) => {
    const { name, value } = e.target; // Use e.target instead of useContext inside handleChange
    // console.log(name, value); // Log or update state as needed
  };
  return (
  <>
  <Redirect />
  <AdminRedirect />
  <EmployerRedirect />
  <div className='flex'>
    <div className='sticky h-full top-0'>
      <ApplicantProfileSummary />
    </div>
    <div className='flex-1 ml-3 w-full'>
      <div>
        <div className='flex my-3 items-center'>
            <div className='bg-black flex-1 h-0.5 bg-opacity-20 rounded-full mr-3'></div>
              <input 
                type="checkbox" 
                id="role-admin" 
                name="match" 
                value={1} 
                className="hidden peer" 
                defaultChecked 
                onClick={handleChange} 
                required 
              />
              <label 
                htmlFor="role-admin" 
                className="inline-flex items-center justify-between py-1 px-3 text-gray-500 bg-white rounded-full cursor-pointer dark:hover:text-gray-prc dark:peer-checked:text-white dark:peer-checked:bg-prc peer-checked:text-blue-600 hover:text-prc hover:bg-gray-100 dark:text-prc dark:bg-transparent dark:border-2 dark:border-prc dark:hover:bg-src dark:hover:bg-opacity-50">
                <div className="block">
                  <div className="text-xs font-bold truncate">Reccomended</div>
                </div>
              </label>
          </div>
          {jobs?.map((item, index) => (
            <ApplicantJobInformation key={index} data={item} user={user?.data}/>
          ))}
      </div>
    </div>
  </div>
  </>
  )
}
