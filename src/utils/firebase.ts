// Importa las funciones necesarias de los SDKs que necesitas
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Añade los SDKs para los productos de Firebase que quieres usar
// https://firebase.google.com/docs/web/setup#available-libraries

// La configuración de tu aplicación web de Firebase
// Para Firebase JS SDK v7.20.0 y posteriores, measurementId es opcional
const firebaseConfig: any = {
  apiKey: "AIzaSyDw52ZM0Pieiv4Klz3bL9i2_msHlC8MCKg",
  authDomain: "app-messages-3f06b.firebaseapp.com",
  projectId: "app-messages-3f06b",
  storageBucket: "app-messages-3f06b.appspot.com",
  messagingSenderId: "541722726268",
  appId: "1:541722726268:web:105dd58faa657fc7b31ef9",
  measurementId: "G-1NHMQW85WX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// Inicializar Firestore
const db = getFirestore(app);
const auth = getAuth(app);
auth.languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
auth.useDeviceLanguage();

export { app, db, auth };