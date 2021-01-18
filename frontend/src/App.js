import React, { useEffect } from "react";
import { auth, getUserToken } from "./firebase";
import { useStore } from "./store";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// import withFirebaseAuth from 'react-with-firebase-auth';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import firebaseConfig from './firebaseConfig';

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

import "./App.css";

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseAppAuth = firebaseApp.auth();
// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// }

// const createComponentWithAuth = withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// });

function App() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  // if (auth.currentUser()){
  //   setUser(auth.currentUser());
  // }
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log("RUNNING");
      setUser(user);
      console.log(user);
    });
  });

  const getToken = async () => {
    console.log(await getUserToken());
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {console.log("userat/", user)}
            {user ? (
              <>
                <Profile />
                <p>Hello, {user.email}</p>
                <button onClick={() => getToken()}>getToken</button>

                <button onClick={() => auth.signOut()}>Sign Out</button>
              </>
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile/:userName" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
