import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFGlcXq2HfLrJoeHmUxhqSBuAAweGHaWg",
    authDomain: "launchhacks2022.firebaseapp.com",
    projectId: "launchhacks2022",
    storageBucket: "launchhacks2022.appspot.com",
    messagingSenderId: "259437755410",
    appId: "1:259437755410:web:9c7679cd7e48f4a3d0accb"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};