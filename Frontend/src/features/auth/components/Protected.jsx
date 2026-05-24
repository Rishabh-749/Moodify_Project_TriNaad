import React from 'react'
import {useAuth} from "../hooks/useAuth";
import { Navigate } from 'react-router';
import Loading from './Loading';
import "../styles/auth.scss";

const Protected = ({children}) => {
  const {user, loading} = useAuth();
    
  if(loading){
    return <Loading center size="main" main />
  }

  if(!user){
    return <Navigate to="/login"/>
  }
  
  return children
}

export default Protected
