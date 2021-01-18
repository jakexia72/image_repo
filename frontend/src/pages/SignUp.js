import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";
import { useStore } from "../store";
// import { Link } from "@reach/router";

const SignUp = () => {
  //   let history = useHistory();
  //   let setUser = useStore((state) => state.setUser);
  let user = useStore((state) => state.user);

  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });

  const emailSignUpHandler = async (data) => {
    try {
      await auth.createUserWithEmailAndPassword(data.email, data.password);
      // console.log('auser', authUser);
      // console.log(useStore.getState().user);
    } catch (er) {
      console.log(er);
    }
  };

  const gooleSignUpHandler = () => {
    try {
      signInWithGoogle();
    } catch (er) {
      console.log(er);
    }
  };

  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      <h1>Sign Up</h1>
      <button onClick={gooleSignUpHandler}>Sign Up With google</button>
      <br />
      <hr />
      <h3>Sign Up With Email</h3>
      <form onSubmit={handleSubmit(emailSignUpHandler)}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true })}
        />
        {errors?.email?.types?.required && <p>email required</p>}
        {errors?.email?.types?.pattern && <p>invalid email</p>}
        {errors?.password?.types?.required && <p>password required</p>}
        <input type="submit" />
      </form>
      <hr />
    </>
  );
};
export default SignUp;
