import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  let navigate = useNavigate();

  return (
    <div>
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default connect(mapStoreToProps)(RegisterPage);
