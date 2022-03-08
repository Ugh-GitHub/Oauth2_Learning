import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';

function LoginPage() {
  let navigate = useNavigate();
  
  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            navigate('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );

}

export default connect(mapStoreToProps)(LoginPage);
