import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Asegúrate de importar Firestore
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDv4zoiiHzT9jKXZVAzUbDORkWxbtD9Wj8",
  authDomain: "bymesecurity-56848.firebaseapp.com",
  projectId: "bymesecurity-56848",
  storageBucket: "bymesecurity-56848.appspot.com",
  messagingSenderId: "116353387077",
  appId: "1:116353387077:web:f7e368106ea6846cd8b12c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Asegúrate de exportar Firestore
export const database = getDatabase(app);

// Configura la persistencia
setPersistence(auth, browserSessionPersistence)
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });


