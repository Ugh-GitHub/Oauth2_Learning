import React, { useLayoutEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import mapStoreToProps from '../../redux/mapStoreToProps';

function RequireAuth({ children, redirectTo, store }) {
  var isAuthenticated = false;
  // const [isAuthenticated,setIsAuthenticated] = useState(false);
  
  useLayoutEffect(() => {
    if (typeof store.user.id !== 'underfined') {
      // setIsAuthenticated(true);
      isAuthenticated = true;
    }
    console.log(isAuthenticated);
  }, []);
    
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default connect(mapStoreToProps)(RequireAuth);