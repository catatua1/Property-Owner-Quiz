// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4lZ0zgOtBHN3m_mGPK77K5zkwgmXrST4",
  authDomain: "property-owners-quiz.firebaseapp.com",
  projectId: "property-owners-quiz",
  storageBucket: "property-owners-quiz.appspot.com",
  messagingSenderId: "943647532840",
  appId: "1:943647532840:web:c561e4ba735b44d482121d",
  measurementId: "G-4XYB71GGWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
