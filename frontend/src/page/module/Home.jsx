import React, { useContext } from 'react'
import Loading from '../cards/Loading'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'

export default function Home() {
  const {role} = useContext(AppContext)

  return (
    <div>
      {/* <Loading /> */}
      {/* {role!=null &&(<Navigate to={role} replace={true} />)} */}
      Home
    </div>
  )
}
