import React from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
  isSigned: boolean;
  children: React.ReactNode;
}

const Protected: React.FC<PrivateRouteProps> = (PrivateRouteProps) => {
  if (PrivateRouteProps.isSigned) {
    return <>{PrivateRouteProps.children}</>
  } else {
    
    return <Navigate to="/" replace/>
  }
}

export default Protected