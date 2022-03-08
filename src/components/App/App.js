import React, { useEffect } from 'react';
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

import './App.css';

function App({ dispatch }) {
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  });

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Route path="/" element={<Navigate replace to="/home" />} />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            path="/about"
            element={< AboutPage />}
          />

          {/* For protected routes, the view could show one of several things on the same route.
          Visiting localhost:3000/user will show the UserPage if the user is logged in.
          If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
          Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <Route
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
            // element={< UserPage />}
            element={
              <RequireAuth redirectTo="/login">
                < UserPage />
              </RequireAuth>
            }
          />

          <Route
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
            element={< InfoPage />}
          />

          {/* When a value is supplied for the authRedirect prop the user will
          be redirected to the path supplied when logged in, otherwise they will
          be taken to the component and path supplied. */}
          <Route
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            // element={< LoginPage />}
            element={
              <LoggedIn redirectTo="/user">
                < LoginPage />
              </LoggedIn>
            }

          />
          <Route
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            // element={< RegisterPage />}
            element={
              <LoggedIn redirectTo="/user">
                < RegisterPage />
              </LoggedIn>
            }
          />
          <Route
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            // element={< LandingPage />}
            element={
              <LoggedIn redirectTo="/user">
                < LandingPage />
              </LoggedIn>
            }
          />

          {/* <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/finished"
            component={Finished}
          />  */}

          {/* If none of the other routes matched, we will show a 404. */}
          <Route render={() => <h1>404</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );

}

function RequireAuth({ children, redirectTo }, { store }) {
  let isAuthenticated = true;
  // if (store.user.id >= 1) {
  //   isAuthenticated = true;
  // }
  
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function LoggedIn({ children, redirectTo }, { store }) {
  let isAuthenticated = true;
  // if (store.user.id >= 1) {
  //   isAuthenticated = true;
  // }
  
  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
}

export default connect()(App);
