import React, { useContext, useEffect, useState } from 'react';
import Redirect, { AdminRedirect, ApplicantRedirect } from '../context/Redirect';
import EmployerProfileSummary from '../cards/EmployerProfileSummary';
import CompanyInformation from '../cards/CompanyInformation';
import { Box, Modal } from '@mui/material';
import { crud } from '../resource/api';
import Loading from '../cards/Loading';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import ContactComponent from './ContactComponent';

export default function CompanyComponent() {
  const {user, apiClient} = useContext(AppContext)
  const company = user?.data?.company
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal visibility state
  const [images, setImages] = useState([]); // State for uploaded images
  const [imagePreviews, setImagePreviews] = useState([]); // State for image previews
  const [companyName, setCompanyName] = useState(''); // State for company name
  const [companyDesc, setCompanyDesc] = useState(''); // State for company description
  const [data, setData] = useState()  
  // Toggle modal visibility
  const handleModal = () => setModalIsOpen(!modalIsOpen);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'company') {
      setCompanyName(value); // Update company name state
    } else if (name === 'desc') {
      setCompanyDesc(value); // Update company description state
    }
  };

  // Handle image input change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setImages(files); // Update state with selected images

    // Generate image previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews); // Update previews
  };

  // Submit images and company data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    
    // Append company name and description to form data
    formData.append('company', companyName);
    formData.append('desc', companyDesc); // Append description
    formData.append('owner_id', user.data.id); // Append description
  
    // Append each image file to the form data
    for (let i = 0; i < images.length; i++) {
      formData.append(`images[${i}]`, images[i]); // Change to indexed notation
    }
    
    // Send a POST request with the image data
    try {
      const response = await apiClient.post(crud.concat('verify-company'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading images', error);
    } finally {
      setLoading(false);
      handleModal(); // Close modal after submission
    }
  };

  useEffect(() => {
    // Set loading state to true when fetching data
    setLoading(true);
    
    const getData = async () => {
        try {
            // // Make a GET request to fetch verified companies using owner_id
            // const response = await apiClient.get(crud.concat('my-verified-company'), {
            //     params: {
            //         owner_id: user?.id, // Make sure user.id is defined
            //     }
            // });

            // Set the retrieved data in the state
            // setData(user.data.data.company);
        } catch (e) {
            console.log("Error: ", e); // Log any error
        } finally {
            // Set loading state to false when done
            setLoading(false);
        }
    };

    // Call the getData function
    getData();
  }, [user]);
  return (
    <>
      <Redirect />
      <AdminRedirect />
      <ApplicantRedirect />
      {loading && (<Loading />)}
      <Modal open={modalIsOpen} onClose={handleModal} aria-labelledby="modal-title" aria-describedby="modal-description"
             className="flex justify-center z-30 items-center h-screen">
        <Box className="bg-white rounded-lg shadow-lg text-def-t">
          <h3 id="modal-title" className='font-semibold text-xl rounded-t-lg text-text px-6 pt-4'>Company</h3>
          <div className='h-0.5 bg-prc rounded-xl mt-1 mx-6 max-w-40'></div>
          <div className='px-6 pb-3 pt-1'>
            <div id="modal-description" className='mb-4 flex'>
              Add your Company
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <label className=' text-text text-sm mb-1'>Company Name</label>
              <input 
                type="text" 
                name='company' 
                placeholder="Company Name" 
                className='mb-2 rounded-md py-2 px-3 border-2' 
                onChange={handleChange} 
                value={companyName} 
              />
              <label className=' text-text text-sm mb-1'>Description</label>
              <textarea 
                cols={4}
                rows={5}
                name='desc' 
                placeholder="Company Description" 
                className='mb-2 rounded-md py-2 px-3 border-2' 
                onChange={handleChange} 
                value={companyDesc} 
              />
              <label className=' text-text text-sm mb-1'>Proof of Company</label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className='mb-2' 
                onChange={handleImageChange} 
              />
              <div className="image-previews grid grid-cols-3">
                {imagePreviews?.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img src={image} alt={`Preview ${index}`} className="w-full h-48 object-cover border-2" />
                  </div>
                ))}
              </div>
              <div className='flex'>  
                <div className='flex-1'></div>
                <div className='cursor-pointer flex-none content-center mr-5 text-prc underline' onClick={handleModal}>Cancel</div>
                <button type='submit' className='mt-2 bg-prc rounded-md py-2 font-bold px-4 text-white'>Yes</button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <div className='flex'>
        <div className='sticky h-full top-0'>
          <EmployerProfileSummary data={user} />  
        </div>
        <div className='flex-1 ml-3 w-full'>
          <div>
            <div className='p-4 bg-white rounded-lg flex hover:bg-white hover:bg-opacity-70 cursor-pointer'>
              <div className='rounded-full h-10 w-10 bg-text mr-2' 
              style={{
                backgroundImage: `url(${user?.data?.image})`,
                backgroundSize: 'cover', // Optional: Make the image cover the entire div
                backgroundPosition: 'center', // Optional: Center the image
              }}></div>
              <div className='rounded-full h-10 w-full border-2 border-text content-center px-4 text-sm border-opacity-65 font-bold text-text text-opacity-50' onClick={handleModal}>
                Add A Company
              </div>
            </div>
            <div className='bg-black w-full h-0.5 bg-opacity-20 rounded-full my-3'></div>
            {company ==null && (
                <div className='flex justify-center items-center h-96'>
                    <div className='text-2xl font-thin text-center'>
                        No Company
                    </div>
                </div>
            )}
            {company?.map((item, index) => (
              <CompanyInformation data={item} key={index}/>
            ))}
          </div>
        </div>
        <div className='sticky h-full top-0'>
          <ContactComponent />
        </div>
      </div>
    </>
  );
}
