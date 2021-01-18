import React, { useEffect } from "react";

import axios from "axios";
import { Redirect } from "react-router-dom";
import NewUserForm from "./NewUserForm";
// import { auth, getUserToken } from './firebase';
import { useStore } from "../store";
import { getURL } from "../helpers/urlHelper";

const Profile = (props) => {
  console.log("pp", props);
  var userName = null;
  if (Object.keys(props).length !== 0) {
    userName = props.match.params.userName;
  }
  const user = useStore((state) => state.user);
  const setUserProfile = useStore((state) => state.setUserProfile);
  const userProfile = useStore((state) => state.userProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userName) {
        const requestUrl = getURL(`user/userName/${userName}`);
        let request;
        try {
          request = await axios.get(requestUrl);
          if (request.data.user) {
            setUserProfile(request.data.user);
          }
        } catch (err) {
          console.log(err);
        }
      } else if (user) {
        const requestUrl = getURL(`user/uid/${user.uid}`);
        let request;
        try {
          request = await axios.get(requestUrl);
          if (request.data.user) {
            setUserProfile(request.data.user);
            console.log("HELP", userProfile);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchProfile();
    // setUserProfile({'test':'test'})
    // console.log(userProfile)
  }, []);

  console.log("body", userProfile);
  return userProfile ? (
    <h1>USER</h1>
  ) : user ? (
    <NewUserForm />
  ) : (
    <Redirect to="/oops" />
  );
};

export default Profile;
