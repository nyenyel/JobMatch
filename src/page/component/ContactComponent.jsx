import React, { useContext, useEffect, useState } from 'react'
import ChatComponent from './ChatComponent'
import { AppContext } from '../context/AppContext'
import { crud } from '../resource/api'
import Loading from '../cards/Loading'

export default function ContactComponent() {
    const {apiClient,user} = useContext(AppContext)
    const [state, setState] = useState({
        data: null,
        chatroom: '',
        loading: false,
        selectedUser: 'Select User',
        selectedImage: null,
    })
    const getData = async () => {
        setState((prev) => ({
            ...prev,
            loading: true
        }))
        try{
            const response = await apiClient.get(crud.concat(`get-contact/${user.data.id}`))
            setState((prev) => ({
                ...prev,
                data: response.data
            }))
            console.log(response.data)
        } catch (error){
            console.log(error)
        } finally {
            setState((prev) => ({
                ...prev,
                loading: false
            }))
        }
    }
    const handleSelect = (item) => {
        const name = item.first_user.id === user?.data.id ? item.second_user.last_name + ', ' + item.second_user.first_name + ' ' + item.second_user.middle_name.charAt(0) :item.first_user.last_name + ', ' + item.first_user.first_name + ' ' + item.first_user.middle_name.charAt(0) 
        const img = item.first_user.id === user?.data.id ? item.second_user.image : item.first_user.image 
        
        setState((prev) => ({
            ...prev,
            selectedUser: name,
            selectedImage: img,
            chatroom: item.chatroom,
        }))
        console.log(item.chatroom)
    }
    useEffect(()=> {
        if(user?.data?.id){
            getData()
        }
    }, [user?.data?.id])
    return (
        <>
        {state.loading && <Loading/>}
        <div className="text-xl pl-4 font-bold">
                My Contact
        </div>
        <div className="ml-4 h-screen flex flex-col max-[800px]:flex-row">
            {/* Contact List */}
            <div className="flex-1 max-h-96 flex flex-col gap-2 mt-2 overflow-y-auto overflow-x-hidden">
                {state?.data?.map((item, index) => { 
                    const name = item.first_user.id === user?.data.id ? item.second_user.last_name + ', ' + item.second_user.first_name + ' ' + item.second_user.middle_name.charAt(0) : item.first_user.last_name + ', ' + item.first_user.first_name + ' ' + item.first_user.middle_name.charAt(0) 
                    const img = item.first_user.id === user?.data.id ? item.second_user.image : item.first_user.image 
                    return(
                        <div onClick={() => handleSelect(item)} key={index} className='hover:bg-gray-100 select-none cursor-pointer rounded-md p-2 flex gap-2 max-[800px]:w-72 w-full'>
                            <div className=' p-4 rounded-full bg-src'
                                style={{
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover', // Optional: Make the image cover the entire div
                                backgroundPosition: 'center', // Optional: Center the image
                                }}/>
                            <div className='content-center'>
                                {name}
                            </div>
                        </div>
                    )
                })}
                {/* Additional contacts */}
            </div>

            {/* Chat Component */}
                <div className="bg-prc rounded-md p-2 flex gap-2 mt-2 max-[800px]:hidden">
                    <div className="p-4 rounded-full bg-src"
                        style={{
                        backgroundImage: `url(${state.selectedImage})`,
                        backgroundSize: 'cover', // Optional: Make the image cover the entire div
                        backgroundPosition: 'center', // Optional: Center the image
                    }}/>
                    <div className="content-center text-white">
                        {state.selectedUser}
                    </div>
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                    <ChatComponent room={state.chatroom} />
                </div>


        </div>
        </>
    )
}

function Contact ({data}){

    return(
        <>

        </>
    )
}
