import * as ActionTypes from './ActionTypes.js';
import * as firebase from 'firebase';
import { ToastAndroid } from 'react-native';

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