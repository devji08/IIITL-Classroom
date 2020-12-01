import React from 'react';
import Main from './components/MainComponent.js';
import { Loading } from './components/loadingComponent.js';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore.js';
import { firebaseConfig } from './components/firebase.js';
import { PersistGate } from 'redux-persist/es/integration/react';

// Initialize Firebase
if(firebase.apps.length == 0){
  firebase.initializeApp(firebaseConfig);
}

const { store } = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate
        persistor={persistor}
        loading = {<Loading/>}> */}
        <Main/>
      {/* </PersistGate> */}
    </Provider>
  );
}
