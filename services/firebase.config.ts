import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDSaKcMxA5bWmr5TkjMuCLNzcGP9w1HO68",
  authDomain: "video-blog-981d7.firebaseapp.com",
  projectId: "video-blog-981d7",
  storageBucket: "video-blog-981d7.appspot.com",
  messagingSenderId: "159065149676",
  appId: "1:159065149676:web:b6863e0dbf72b1319395c9"
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
