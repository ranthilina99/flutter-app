import firebase from 'firebase/compat/app';
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDifavVVrPy6LqCF4LlOP3J0iICStGp7Ps",
    authDomain: "flutter-project-c524e.firebaseapp.com",
    databaseURL: "https://flutter-project-c524e-default-rtdb.firebaseio.com",
    projectId: "flutter-project-c524e",
    storageBucket: "flutter-project-c524e.appspot.com",
    messagingSenderId: "651703970036",
    appId: "1:651703970036:web:573bed55aa57a30c0c96a1"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
