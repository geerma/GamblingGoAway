import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDFGlcXq2HfLrJoeHmUxhqSBuAAweGHaWg",
    authDomain: "launchhacks2022.firebaseapp.com",
    databaseURL: "https://launchhacks2022-default-rtdb.firebaseio.com/",
    projectId: "launchhacks2022",
    storageBucket: "launchhacks2022.appspot.com",
    messagingSenderId: "259437755410",
    appId: "1:259437755410:web:9c7679cd7e48f4a3d0accb"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Firestore for general database

export const rtdb = getDatabase(app); // Real-time database for user-authenticated information
export const auth = getAuth();