import React from 'react'
import { useContext } from 'react'
import  AuthContext  from '../Context/AuthContext'

function Homepage() {

  const authcontext = useContext(AuthContext)
  const { contextData } = authcontext

  return (
    <div>
      <h1>Homepage</h1>
      <h2>{contextData.user.user_type}</h2>
    </div>
  )
}

export default Homepage