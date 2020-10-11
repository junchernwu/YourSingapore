import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBCe2AqXx3qP_mO7D9Ev3AyF17mcOoJRlQ",
    authDomain: "singapore-united.firebaseapp.com",
    databaseURL: "https://singapore-united.firebaseio.com",
    projectId: "singapore-united",
    storageBucket: "singapore-united.appspot.com",
    messagingSenderId: "1013321690441",
    appId: "1:1013321690441:web:ad3dabcfc79f26b081fe98",
    measurementId: "G-XJB9B9ZGSX"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.firestore();

export default database

