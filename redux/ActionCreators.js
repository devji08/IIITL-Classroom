import * as ActionTypes from './ActionTypes.js';
import * as firebase from 'firebase';
import { ToastAndroid } from 'react-native';
import db from '../components/firebase.js';

export const loginUser = (email, password) => async dispatch => {
    dispatch(addUserLoading());
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            if(user.user.emailVerified){
                dispatch(addUser(user.user));
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
    firebase.auth().signOut()
    .then(() => {
        dispatch(removeUser());
    })
}

export const removeUser = () => ({
    type : ActionTypes.REMOVE_USER,
    payload : null
});


export const signUpUser = (email, password, userName, toggleLogin) => async dispatch => {
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
                toggleLogin();
            })
            .catch(error => dispatch(signUpUserError(error.message)));
            db.collection('users').doc(email).set({
                email : email,
                userName : userName,
                photoURL : null
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

export const fetchSubject = (sem) => async dispatch => {
    db.collection('Subjects')
    .doc(`${sem}`).
    get().
    then(function(doc) {
        dispatch(subjectFetch(doc.data().Subjects));
    })
    .catch(error => {dispatch(subjectError(error))});
};

export const subjectFetch = (subjects) => ({
    type : ActionTypes.SUBJECT_FETCH,
    payload : subjects
});

export const subjectError = (errorMsg) => ({
    type : ActionTypes.SUBJECT_ERROR,
    payload : errorMsg
});

export const addPost = (email, title, image, subCode) => async dispatch => {

    dispatch(addPostLoading());
    var postRef = db.collection('posts').doc();
    var id = postRef.id;

    if(image!=null){
        const fileExt = image.split('.').pop();
        const response = await fetch(image);
        const blob = await response.blob();
        const fileName = `${id}.${fileExt}`;
        
        var imageRef = firebase.storage().ref(`posts/${fileName}`);
        var uploadTask = imageRef.put(blob);
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                console.log('Snapshot : '+snapshot.state);
                if(snapshot.state === firebase.storage.TaskState.SUCCESS){
                    console.log("Success");
                }
            },
            error => {
                console.log(error.toString());
                dispatch(addPostError(error));
            },
            () => {
                imageRef.getDownloadURL()
                .then((downloadURL) => {
                    postRef.set({
                        id :id,
                        user : email,
                        title : title,
                        image : downloadURL,
                        subCode : subCode,
                        timeStamp : firebase.firestore.FieldValue.serverTimestamp(),
                        date : new Date()
                    });
                    dispatch(addPostDone());
                })
                .catch(error => {
                    dispatch(addPostError(error));
                });
            }
        );
    }
    else{
        postRef.set({
            id : id,
            user : email,
            title : title,
            image : image,
            subCode : subCode,
            timeStamp : firebase.firestore.FieldValue.serverTimestamp(),
            date : new Date()
        });
        dispatch(addPostDone());
    }
}

export const addPostDone = () => ({
    type : ActionTypes.ADD_POST,
    payload: null
});

export const addPostLoading = () => ({
    type : ActionTypes.ADD_POST_LOADING,
    payload : true
});

export const addPostError = (error) => ({
    type : ActionTypes.ADD_POST_ERROR,
    payload : error
});

export const fetchPost = () => async dispatch => {
    db.collection("posts")
    .orderBy('timeStamp', 'desc')
    .onSnapshot(function(querySnapshot) {
        var posts = [];
        querySnapshot.forEach(function(doc){
            posts.push(doc.data());
        });
        dispatch(feedFetch(posts));
    })
    .catch(error => {
        dispatch(feedError(error))
    });
};

export const feedFetch = (posts) => ({
    type : ActionTypes.FEED_FETCH,
    payload : posts
});

export const feedError = (errorMsg) => ({
    type : ActionTypes.FEED_ERROR,
    payload : errorMsg
});

export const fetchPostUser = (email) => async dispatch => {
    console.log("fetchPostUser");
    console.log(email);
    db.collection("users").doc(email)
    .onSnapshot(function(doc) {
        var user = doc.data();
        dispatch(postUserFetch(user));
        console.log("Done");
    })
    .catch(error => {
        dispatch(postUserError(error))
    });
};

export const postUserFetch = (user) => ({
    type : ActionTypes.FETCH_USER,
    payload : user
});

export const postUserError = (errorMsg) => ({
    type : ActionTypes.FETCH_USER_ERROR,
    payload : errorMsg
});

export const uploadUserPhoto = (image, email) => async dispatch => {
    dispatch(addUserPhotoLoading());
    const fileExt = image.split('.').pop();
    var fileName = `${email}.${fileExt}`;
    const response = await fetch(image);
    const blob = await response.blob();
    var imageRef = firebase.storage().ref(`users/${fileName}`);

    var uploadTask = imageRef.put(blob);
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                console.log('Snapshot : '+snapshot.state);
                if(snapshot.state === firebase.storage.TaskState.SUCCESS){
                    console.log("Success");
                }
            },
            error => {
                dispatch(addUserPhotoErorr(error));
            },
            () => {
                imageRef.getDownloadURL()
                .then((downloadURL) => {
                    var user = firebase.auth().currentUser;
                    user.updateProfile({
                        photoURL : downloadURL
                    })
                    .then(() => {dispatch(addUserPhoto(downloadURL))})
                    .catch((error) => {dispatch(addUserPhotoErorr(error))});
                    db.collection('users').doc(email).set({
                        photoURL : downloadURL
                    }, {merge : true});
                })
                .catch(error => {
                    dispatch(addUserPhotoErorr(error));
                });
            }
        );
};

export const addUserPhotoLoading = () => ({
    type : ActionTypes.ADD_USER_PHOTO_LOADING,
    payload : true
});

export const addUserPhotoErorr = (error) => ({
    type : ActionTypes.ADD_USER_PHOTO_ERROR,
    payload : error
});

export const addUserPhoto = (image) => ({
    type : ActionTypes.ADD_USER_PHOTO,
    payload : image
});