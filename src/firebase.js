  import firebase from "firebase/compat/app";
  import "firebase/compat/auth"
  import "firebase/compat/database"
  import "firebase/compat/firestore"
  import "firebase/compat/storage"
  
  

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB2whEG363Yd2SzhL9MviwooGw46Ce9LP0",
    authDomain: "instagram-clone-kaustav.firebaseapp.com",
    projectId: "instagram-clone-kaustav",
    storageBucket: "instagram-clone-kaustav.appspot.com",
    messagingSenderId: "870544466421",
    appId: "1:870544466421:web:05afaff447fd79d0ea80bc",
    measurementId: "G-NJD8WEW8P7"
  });


  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage};

