// Firebase Configuration
// Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj-z2sp-1lRqJJ17_G3IDQ-YFMVZ8etQI",
  authDomain: "sekolahanaksaleh-mm21th.firebaseapp.com",
  projectId: "sekolahanaksaleh-mm21th",
  storageBucket: "sekolahanaksaleh-mm21th.firebasestorage.app",
  messagingSenderId: "821480218803",
  appId: "1:821480218803:web:b0948342c64e78120950c6"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase Initialized');
} else {
    console.error('Firebase SDK not loaded.');
}

// Make services available globally
window.db = firebase.firestore();
window.storage = firebase.storage();
