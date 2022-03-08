import React, { useState } from 'react';
import { connect } from 'react-redux';

import mapStoreToProps from '../../redux/mapStoreToProps';

function LoginForm({ dispatch, store }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();
    console.log("from login user",username, password);

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login



  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {store.errors.loginMessage && (
        <h3 className="alert" role="alert">
          {store.errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
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
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );

}

export default connect(mapStoreToProps)(LoginForm);
