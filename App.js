import React from 'react';
import Main from './components/MainComponent.js';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore.js';

var firebaseConfig = {
  apiKey: "AIzaSyDzUSm6aFfL9CLxqCqcUHXPPvC5Ohb4DkQ",
  authDomain: "disscussionforum.firebaseapp.com",
  databaseURL: "https://disscussionforum.firebaseio.com",
  projectId: "disscussionforum",
  storageBucket: "disscussionforum.appspot.com",
  messagingSenderId: "18040025944",
  appId: "1:18040025944:web:ce979327933993da476b2d",
  measurementId: "G-2Q6JM432R2"
};
// Initialize Firebase
if(firebase.apps.length == 0){
  firebase.initializeApp(firebaseConfig);
}

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}
