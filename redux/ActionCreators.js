import * as ActionTypes from './ActionTypes.js';
import * as firebase from 'firebase';
import { ToastAndroid } from 'react-native';
import db from '../components/firebase.js';

export const loginUser = (email, password, navigate) => async dispatch => {
    console.log("thunk");
    dispatch(addUserLoading());
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            if(user.user.emailVerified){
                dispatch(addUser(user.user));
                navigate('Authentication');
                navigate('Profile');
            }
            else{
                dispatch(addUserError('Account not Verified'));
            }
        })
        .catch(error => {dispatch(addUserError(error.message))});
}

export const addUserError = (error) => ({
    type : ActionTypes.ADD_USER_ERROR,
    payload: error
});

export const addUserLoading = () => ({
    type : ActionTypes.ADD_USER_LOADING,
    payload : true
});

export const addUser = (user) => ({
    type : ActionTypes.ADD_USER,
    payload: user
});

export const signOutUser = () => async dispatch => {
    console.log("signout");    
    firebase.auth().signOut()
    .then(() => dispatch(removeUser()));
}

export const removeUser = () => ({
    type : ActionTypes.REMOVE_USER,
    payload : null
});


export const signUpUser = (email, password, userName, goBack) => async dispatch => {
    console.log("Signup");
    dispatch(signUpUserLoading());
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            user.user.updateProfile({
                displayName: userName
            })
            .catch(error => dispatch(signUpuserError(error.msg)));
            user.user.sendEmailVerification()
            .then(() => {
                ToastAndroid.show("Please check your Email and Log-in again",ToastAndroid.LONG);
                goBack();
            })
            .catch(error => dispatch(signUpUserError(error.message)));
            db.collection('users').doc(email).set({
                email : email,
                userName : userName,
                posts : []
            });
        })
        .catch(error => {dispatch(signUpUserError(error.message))});
};

export const signUpUserLoading = () => ({
    type : ActionTypes.SIGNUP_USER_LOADING,
    payload : true
});

export const signUpUserError = (errorMsg) => ({
    type : ActionTypes.SIGNUP_USER_ERROR,
    payload : errorMsg
});