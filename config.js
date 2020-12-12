import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDYDmH_ykQ0FxkmOPB_V80G3gScKYdOV90",
  authDomain: "barter-app-e3be9.firebaseapp.com",
  databaseURL: "https://barter-app-e3be9.firebaseio.com",
  projectId: "barter-app-e3be9",
  storageBucket: "barter-app-e3be9.appspot.com",
  messagingSenderId: "285014974904",
  appId: "1:285014974904:web:823b7a7bb772242159af4d"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
