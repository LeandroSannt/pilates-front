import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard:React.FC = () =>{
  const navigate = useNavigate()

  useEffect(() =>{
    navigate('/aulas')
  },[])

  return(
    <>
    <Outlet/>
    </>
  )
}
export default Dashboard