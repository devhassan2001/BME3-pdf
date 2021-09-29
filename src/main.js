import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/css/global.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDIGdnFR-X9MnnTNHIa8i2meBQlvQCNi7M",
  authDomain: "bme3-pdf.firebaseapp.com",
  projectId: "bme3-pdf",
  storageBucket: "bme3-pdf.appspot.com",
  messagingSenderId: "713711101725",
  appId: "1:713711101725:web:e28ae34aca1f5d52fc63f4",
  measurementId: "G-045RBFC2R1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export default db;

createApp(App).use(store).use(router).mount('#app')
