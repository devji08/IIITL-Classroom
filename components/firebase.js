import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDzUSm6aFfL9CLxqCqcUHXPPvC5Ohb4DkQ",
    authDomain: "disscussionforum.firebaseapp.com",
    databaseURL: "https://disscussionforum.firebaseio.com",
    projectId: "disscussionforum",
    storageBucket: "disscussionforum.appspot.com",
    messagingSenderId: "18040025944",
    appId: "1:18040025944:web:ce979327933993da476b2d",
    measurementId: "G-2Q6JM432R2",
    storageBucket : "gs://disscussionforum.appspot.com"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export { firebaseConfig };
export default db;