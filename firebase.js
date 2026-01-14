 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
  import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAh2oRoNcp1RtP9PhbtgK9RpAX8lPz-h-A",
    authDomain: "portfolio-da437.firebaseapp.com",
    projectId: "portfolio-da437",
    storageBucket: "portfolio-da437.firebasestorage.app",
    messagingSenderId: "990557957288",
    appId: "1:990557957288:web:a620597d43a04077fbe69d"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export{db, collection, addDoc};