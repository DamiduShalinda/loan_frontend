import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext} from	'react'
import AuthContext from '../Context/AuthContext'

type PrivateRouteProps = {
  children: React.ReactNode;
}

const Protected: React.FC<PrivateRouteProps> = (PrivateRouteProps) => {

  const {contextData} = useContext(AuthContext)
  if (contextData.user) {
    return <>{PrivateRouteProps.children}</>
  } else {
    
    return <Navigate to="/" replace/>
  }
}

export default Protected