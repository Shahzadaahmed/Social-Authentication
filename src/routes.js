// Note: Routes component...!

import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
}
  from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import firebaseConfig from "./config/firebase-config";
import firebase from "firebase";
import { getAuthenticatedUser } from "./store/action/auth-actions";

// Note: Importing reuseabale components...!
import SignUp from "./components/auth-components/signup";
import LogIn from "./components/auth-components/login";
import ForgetPassword from "./components/auth-components/forget-password";

import Home from "./components/home-component/home";
import NotFound from "./components/not-found-component/not-found";

const AppRoutes = () => {

  // Note: Handeling redux here...!
  const dispatch = useDispatch();

  useEffect(() => {
    // Note: Get the currently signed-in user...!
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User signed in...!
        // console.log(user.uid);
        dispatch(getAuthenticatedUser(user.uid));
      }
    });
  }, []);

  // Note: Maintain user session using redux...!
  let getUser = useSelector(({ users }) => { return users.authenticatedUser });
  console.log(getUser);

  return (
    <React.Fragment>
      <Router>
        {
          (getUser)
            ?
            (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )
            :
            (
              <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="forget-password" element={<ForgetPassword />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )
        }
      </Router>
    </React.Fragment>
  );
}

export default AppRoutes;