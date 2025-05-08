import React, { useContext } from 'react';
import { Context } from './js/context';
import LottieSpinner from './components/LottieSpinner';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {loading,user,role} = useContext(Context)
    if(loading){
        return <LottieSpinner></LottieSpinner>
    }
    if(user){
        return children
    }
    else{
        return <Navigate to={'/login'}></Navigate>
    }
    
};

export default PrivateRoute;