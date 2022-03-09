import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';


import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Functional Component');

  // let navigate = useNavigate();
  // https://stackoverflow.com/questions/56353125/react-router-how-to-redirect-user-if-logged-in
  // useEffect(() => {
  //   if(isAuthenticated()){
  //    this.props.history.push("/dashboard")
  //   }
  // });

  let navigate = useNavigate();

  return (
    <div className="container">
      <h2>{heading}</h2>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Just a project where I update the an old project to React 17.0.2 and learn to implement OAuth 2.0
          </p>
        </div>    
        <div className="grid-col grid-col_4">
          <RegisterForm />
          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={() => {
              navigate('/login');
            }}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
  
}

export default connect(mapStoreToProps)(LandingPage);
