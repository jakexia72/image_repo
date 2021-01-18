import firebase from "firebase";
require("firebase/auth");

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENTID}`,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const getUserToken = async () => {
  console.log("GETTING TOKEN");
  const token = await auth.currentUser.getIdToken(true);
  return token;
};
// export const createUserWithEmailAndPassword = async (email, password) => {
//   try {
//     const {user} = await auth.createUserWithEmailAndPassword(email, password);
//     return user;
//   } catch (err) {
//     console.log(err);
//   }
// }
