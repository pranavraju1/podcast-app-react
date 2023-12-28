import React from 'react'
import {useAuthState} from "react-firebase-hooks/auth"
import { Outlet,Navigate } from 'react-router-dom'
import { auth } from '../../firebase'
import Loader from './Loader'

const PrivateRoutes = () => {
  const [user,loading,error] = useAuthState(auth);
  if(loading){
    return <Loader />;
    // this will be shown is loading is the state
  }else if(!user||error){
    return <Navigate to="/" replace/>
    // if there is no user or there is an error then return to signup page
  }else{
    return <Outlet/>
    // whatever in child will be directed there

  }
}

export default PrivateRoutes