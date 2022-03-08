import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function RegisterForm({ dispatch, store }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = (event) => {
    event.preventDefault();
    console.log("from register user",username, password);

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {store.errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {store.errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );

}

export default connect(mapStoreToProps)(RegisterForm);
