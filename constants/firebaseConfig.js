// constants/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDsMvGSCk11_MYrM3WGhfltDIOQO0nXrT0",
    authDomain: "dosesense.firebaseapp.com",
    projectId: "dosesense",
    storageBucket: "dosesense.firebasestorage.app",
    messagingSenderId: "383428338414",
    appId: "1:383428338414:web:ca0505c2a905fb7bec49ff",
};

// Initialiseer de Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Haal de Firestore database op mét app
const db = getFirestore(app);

export { db };