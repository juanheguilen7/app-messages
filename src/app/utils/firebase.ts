// Importa las funciones necesarias de los SDKs que necesitas
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged  } from 'firebase/auth';

// TODO: Añade los SDKs para los productos de Firebase que quieres usar
// https://firebase.google.com/docs/web/setup#available-libraries

// La configuración de tu aplicación web de Firebase
// Para Firebase JS SDK v7.20.0 y posteriores, measurementId es opcional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// Inicializar Firestore
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();


export { app, db, auth, provider, onAuthStateChanged };