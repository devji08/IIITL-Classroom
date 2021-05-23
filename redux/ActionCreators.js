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
                db.collection('users').doc(email).onSnapshot( (doc) => {
                    var obj = doc.data();
                    dispatch(addUser(obj));
                });
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
        dispatch(subjectFetch(null));
    })
}

export const removeUser = () => ({
    type : ActionTypes.REMOVE_USER,
    payload : null
});


export const signUpUser = (email, password, userName, toggleLogin, profession) => async dispatch => {
    dispatch(signUpUserLoading());
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            user.user.updateProfile({
                displayName: userName,
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
                displayName : userName,
                photoURL : null,
                profession : profession,
                uid : email
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
        console.log(doc.data());
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

export const fetchProfessorSubject = (email) => async dispatch => {
    db.collection('ProfessorMatrix')
    .doc(`${email}`).
    get().
    then(function(doc) {
        dispatch(professorSubjectFetch(doc.data()));
    })
    .catch(error => {dispatch(professorSubjectError(error))});
};

export const professorSubjectFetch = (subjects) => ({
    type : ActionTypes.PROFESSOR_SUBJECT_FETCH,
    payload : subjects
});

export const professorSubjectError = (errorMsg) => ({
    type : ActionTypes.PROFESSOR_SUBJECT_ERROR,
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
                        date : new Date(),
                        likes : [],
                        comments : []
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
            likes : [],
            comments : [],
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
    }, function (error) {
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

export const fetchAssignment = (subCode) => async dispatch => {
    db.collection('Assignments')
    .doc(`${subCode}`)
    .onSnapshot((doc) => {
        dispatch(assignmentFetch(doc.data()));
    })
    .catch(error => {dispatch(assignmentFetchError(error))});
};

export const assignmentFetch = (assignment) => ({
    type : ActionTypes.ADD_ASSIGNMENT,
    payload : assignment
});

export const assignmentFetchError = (errorMsg) => ({
    type : ActionTypes.ADD_ASSIGNMENT_ERROR,
    payload : errorMsg
});

export const fetchQuiz = (subCode) => async dispatch => {
    db.collection('Quiz')
    .doc(`${subCode}`).
    onSnapshot((doc) => {
        dispatch(quizFetch(doc.data()));
    })
    .catch(error => {dispatch(quizFetchError(error))});
};

export const quizFetch = (assignment) => ({
    type : ActionTypes.ADD_QUIZ,
    payload : assignment
});

export const quizFetchError = (errorMsg) => ({
    type : ActionTypes.ADD_QUIZ_ERROR,
    payload : errorMsg
});

export const submitAssignment = (data, file) => async dispatch => {
    dispatch(submitAssignmentLoading());
    console.log("entered", data);
    var postRef = db.collection(`${data.subcode}`).doc(`${data.title}`);
    var id = postRef.id;

    const fileExt = file.uri.split('.').pop();
    const response = await fetch(file.uri);
    const blob = await response.blob();
    const fileName = `${data.email}.${fileExt}`;
    const email  = data.email;
    var fileRef = firebase.storage().ref(`${data.subcode}/${data.title}/${fileName}`);
    var uploadTask = fileRef.put(blob);
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
            dispatch(submitAssignmentError(error));
        },
        () => {
            fileRef.getDownloadURL()
            .then((downloadURL) => {
                postRef.set({[email] : {
                    id :id,
                    username : data.username,
                    email : data.email,
                    file : downloadURL,
                    filename : file.name,
                    marks : 0,
                    timeStamp : firebase.firestore.FieldValue.serverTimestamp(),
                    date : new Date(),
                }}, {merge : true});
                dispatch(submitAssignmentDone());
            })
            .catch(error => {
                dispatch(submitAssignmentError(error));
            });
        }
    );
}

export const submitAssignmentDone = () => ({
    type : ActionTypes.SUBMIT_ASSIGNMENT,
    payload: false
});

export const submitAssignmentLoading = () => ({
    type : ActionTypes.SUBMIT_ASSIGNMENT_LOADING,
    payload : true
});

export const submitAssignmentError = (error) => ({
    type : ActionTypes.SUBMIT_ASSIGNMENT_ERROR,
    payload : error
});

export const createAssignment = (data) => async dispatch => {

    dispatch(createAssignmentLoading());
    var postRef = db.collection(`${data.type}`).doc(`${data.subcode}`);
    var id = postRef.id;

    const fileExt = data.file.split('.').pop();
    const response = await fetch(data.file);
    const blob = await response.blob();
    const fileName = `${data.title}.${fileExt}`;
    var fileRef = firebase.storage().ref(`${data.type}/${data.subcode}/${fileName}`);
    var uploadTask = fileRef.put(blob);
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
            dispatch(createAssignmentError(error));
        },
        () => {
            console.log("goback");
            fileRef.getDownloadURL()
            .then((downloadURL) => {
                postRef.set({[data.title] : {
                    description : data.description,
                    due : data.due,
                    file : downloadURL,
                    points : data.points,
                    postdate : new Date(),
                    professor : data.professor,
                    title : data.title,
                }}, {merge : true});
                dispatch(createAssignmentDone());
                data.navigation.goBack();
            })
            .catch(error => {
                console.log(error)
                dispatch(createAssignmentError(error));
            });
        }
    );
};

export const createAssignmentDone = () => ({
    type : ActionTypes.CREATE_ASSIGNMENT,
    payload : false
});

export const createAssignmentLoading = () => ({
    type : ActionTypes.CREATE_ASSIGNMENT_LOADING,
    payload : true
});

export const createAssignmentError = (errorMsg) => ({
    type : ActionTypes.CREATE_ASSIGNMENT_ERROR,
    payload : errorMsg
});

export const checkAssignment = (data) => async dispatch => {
    console.log(data);
    dispatch(checkAssignmentLoading());

    db.collection(`${data.subcode}`).doc(`${data.title}`).set({
        [data.email] : {marks : data.points} 
    },{merge : true})
    .then(() => {
        dispatch(checkAssignmentDone());
        console.log("Document successfully written!");
        data.navigation.goBack();
    })
    .catch((error) => {
        dispatch(checkAssignmentError());
        console.error("Error writing document: ", error);
    });
};

export const checkAssignmentDone = () => ({
    type : ActionTypes.CHECK_ASSIGNMENT,
    payload : false
});

export const checkAssignmentLoading = () => ({
    type : ActionTypes.CHECK_ASSIGNMENT_LOADING,
    payload : true
});

export const checkAssignmentError = (errorMsg) => ({
    type : ActionTypes.CHECK_ASSIGNMENT_ERROR,
    payload : errorMsg
});
