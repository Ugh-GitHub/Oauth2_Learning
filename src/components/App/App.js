import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';

import { connect } from 'react-redux';


import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LandingPage from '../LandingPage/LandingPage';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoggedIn from '../LoggedIn/LoggedIn';
import LoggedOut from '../LoggedOut/LoggedOut';

import './App.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

function App({ dispatch, store }) {
  const [loading, setLoading] = useState(false);
  // const [user,setUser] = useState('');
  // const [isAuthenticated,setIsAuthenticated] = useState(false);

  useLayoutEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);


  // useEffect(() => {
  //   console.log("hello world", LoggedIn)
  //   setTimeout(() => console.log("hello world", store),5000);
  // }, []);
  

  if (loading) return null;
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          {/* Redirects */}
          <Route path="/" element={<Navigate replace to="/home" />} />
          {/* Always accessible */}
          <Route path="/about" element={< AboutPage />}/>
          {/* Protected Routes */}
          <Route element={<LoggedOut/>}>
            <Route path="/user" element={<UserPage/>}/>
            <Route path="/info" element={< InfoPage />}/>
          </Route>
          {/* Signed-Out Routes */}
          <Route element={<LoggedIn/>}>
              <Route path="/home" element={<LandingPage/>}/>
              <Route path="/registration" element={<RegisterPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
          </Route>
          {/* 404 Page */}
          <Route render={() => <h1>404</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );

}

export default connect(mapStoreToProps)(App);
