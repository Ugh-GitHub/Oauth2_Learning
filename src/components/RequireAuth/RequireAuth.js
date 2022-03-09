import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import mapStoreToProps from '../../redux/mapStoreToProps';

function RequireAuth({ children, redirectTo, store }) {
    let isAuthenticated = true;
    if (typeof store.user.id === 'undefined') {
        isAuthenticated = false;
    }
    
    
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

export default connect(mapStoreToProps)(RequireAuth);