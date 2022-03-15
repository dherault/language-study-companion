import 'flexpad/dist/flexpad.css'
import 'mpxx/mpxx.min.css'

import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

// import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'

import App from './App'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyArWP0fwUSr7wklrQi4fDcJX9ghjK1Xlv0',
  authDomain: 'language-study-companion.firebaseapp.com',
  projectId: 'language-study-companion',
  storageBucket: 'language-study-companion.appspot.com',
  messagingSenderId: '382049514291',
  appId: '1:382049514291:web:4e6ac1118a48c5f21b4446',
  measurementId: 'G-DDM2FHK4BG',
}

// Initialize Firebase
initializeApp(firebaseConfig)
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
