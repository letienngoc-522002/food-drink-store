import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAowKzwIx-KX7gNA8cCTsS219ZMpsvm_N8",
    authDomain: "quanlynhahangapp-7d1a7.firebaseapp.com",
    databaseURL: "https://quanlynhahangapp-7d1a7-default-rtdb.firebaseio.com",
    projectId: "quanlynhahangapp-7d1a7",
    storageBucket: "quanlynhahangapp-7d1a7.appspot.com",
    messagingSenderId: "653337079225",
    appId: "1:653337079225:web:2439fc1e6f74b382e95a68"
  };
  
// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };