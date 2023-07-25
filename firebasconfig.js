import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection,deleteDoc ,updateDoc, doc, setDoc, addDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getStorage, ref , getDownloadURL, uploadBytes  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAM60KWvtkG839mU292mJzblIqWalqkkJo",
    authDomain: "social-media-app-7593f.firebaseapp.com",
    projectId: "social-media-app-7593f",
    storageBucket: "social-media-app-7593f.appspot.com",
    messagingSenderId: "57654938598",
    appId: "1:57654938598:web:616b84298b629aa89d2427"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getFirestore,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getDoc,
  ref,
  getDownloadURL,
  uploadBytes ,
  getStorage,
  deleteDoc,
  updateDoc
};
