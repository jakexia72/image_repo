import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useStore } from "../store";
import { Redirect } from "react-router-dom";
import { auth, getUserToken, signInWithGoogle } from "../firebase";
import { getURL } from "../helpers/urlHelper";

const NewUserForm = () => {
  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });

  let setUserProfile = useStore((state) => state.setUserProfile);
  let userProfile = useStore((state) => state.userProfile);
  const onSubmit = async (data) => {
    const token = await getUserToken();
    const requestUrl = getURL("user");
    console.log(data);
    const request = await axios.post(
      requestUrl,
      {
        newUser: { ...data },
      },
      { headers: { authorization: `Token ${token}` } }
    );

    if (request.status === 200) {
      setUserProfile(request.data.user);
    }
  };

  return !userProfile ? (
    <>
      <h1> Welcome! </h1>
      <h2> Please set up your profile </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name</label>
        <br />
        <input name="firstName" placeholder="Steve" ref={register} />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <br />
        <input name="lastName" placeholder="Jobs" ref={register} />
        <br />
        <label htmlFor="userName">Pick a handle</label>
        <br />
        <input name="userName" placeholder="crazyOne" ref={register} />
        <br />
        <label htmlFor="bio">Bio</label>
        <br />
        <textarea
          name="bio"
          placeholder="Co-founder of Apple Inc."
          ref={register}
        />
        <br />
        <input type="submit" />
      </form>
    </>
  ) : (
    <div></div>
  );
};
export default NewUserForm;
