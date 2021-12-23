// Note: All authentication functions are defined here...!

import {
    SIGN_UP_USER,
    CHECK_USER,
    LOGOUT_USER,
    LOG_IN_USER_WITH_FACEBOOK
}
    from "../constant/action-types";
import firebaseConfig from "../../config/firebase-config";
import firebase from "firebase";
import swal from "sweetalert";

/***** Note: Function to SIGN UP USER *****/
const signUpUser = (user) => {
    return async (dispatch) => {
        // console.log(user);

        try {
            // Note: Firebase user authentication process...!
            let response = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            // console.log(response.user);
            user.uid = response.user.uid;
            delete user.password;
            console.log(user);

            // Note: Saving user data in firebase firestore...!
            let userData = await firebase.firestore().collection('Users').add(user);
            console.log("Document written with ID: ", userData.id);

            // Note: Saving user in redux store...!
            // dispatch({
            //     type: SIGN_UP_USER,
            //     payload: user
            // });
        }

        catch (error) {
            console.log(error.message);
            swal({
                title: "Error! ⚠️",
                text: `${error.message}`,
                icon: "warning",
                button: "Try Again",
            });
        }
    }
}

/***** Note: Function to LOG IN USER *****/
const logInUser = (user) => {
    return async () => {
        // console.log(user);

        try {
            let response = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
            swal({
                title: "Logged In Successfully!",
                text: "You have logged in sucessfully!",
                icon: "success",
                button: "Ok!",
            });
        }

        catch (error) {
            console.log(error.message);
            swal({
                title: "Error! ⚠️",
                text: `${error.message}`,
                icon: "warning",
                button: "Try Again",
            });
        }
    }
}

// Note: Function to maintain user session...!
const getAuthenticatedUser = (uid) => {
    return async (dispatch) => {
        // console.log(uid);
        try {
            let response = await firebase.firestore().collection('Users').where("uid", "==", uid).get();
            response.forEach((doc) => {
                // console.log(doc.id, "=>", doc.data());
                dispatch({
                    type: CHECK_USER,
                    payload: doc.data()
                });
            });
        }

        catch (error) {
            console.error(`${error}`);
        }
    }
}

/***** Note: Function to LOG OUT USER *****/
const logoutUser = () => {
    return async (dispatch) => {
        try {
            firebase.auth().signOut();
            dispatch({
                type: LOGOUT_USER
            });
            swal({
                title: "Good Bye!",
                text: "You have logged out sucessfully!",
                icon: "success",
                button: "Bye!",
            });
        }

        catch (error) {
            console.error(`${error}`);
        }
    }
}

// Note: Function to forget password...!
const resetPassword = (user) => {
    return async () => {
        // console.log(user);

        try {
            let response = await firebase.auth().sendPasswordResetEmail(user.email); // Email sent.
            console.log(response);
            swal({
                title: "Email Sent!",
                text: "Check your email and reset the password!",
                icon: "success",
                button: "Ok!",
            });
        }

        catch (error) {
            console.error(`${error}`);
        }
    }
}

/***** SOCIAL LOGIN *****/

/***** Note: Function to LOG IN USER WITH FACEBOOK *****/
const logInUserWithFacebook = () => {
    return async (dispatch) => {

        try {
            let provider = new firebase.auth.FacebookAuthProvider();
            let response = await firebase.auth().signInWithPopup(provider);
            // console.log(response.user);

            let userObj = {
                name: response.user.displayName,
                email: response.user.email,
                userProfileImage: response.user.photoURL,
                uid: response.user.uid
            }
            console.log(userObj);

            // Note: Saving user data in firebase firestore...!
            let userData = await firebase.firestore().collection('Users').add(userObj);
            console.log("Document written with ID: ", userData.id);

            // Note: Saving user in redux store...!
            dispatch({
                type: LOG_IN_USER_WITH_FACEBOOK,
                payload: userObj
            });

            swal({
                title: "Logged In Successfully!",
                text: "You have logged in sucessfully!",
                icon: "success",
                button: "Ok!",
            });
        }

        catch (error) {
            console.log(error.message);
        }
    }
}

export {
    signUpUser,
    logInUser,
    getAuthenticatedUser,
    logoutUser,
    resetPassword,
    logInUserWithFacebook
};