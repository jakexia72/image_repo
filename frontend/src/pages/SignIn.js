import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useStore } from "../store";
import { Redirect } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";
const SignIn = () => {
  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = async (data) => {
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password);
    } catch (er) {
      console.log(er);
    }
  };

  const gooleSignInHandler = () => {
    try {
      signInWithGoogle();
    } catch (er) {
      console.log(er);
    }
  };

  let user = useStore((state) => state.user);
  console.log("user", user);

  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      <h1>Sign In</h1>
      <button onClick={gooleSignInHandler}>Sign In With google</button>
      <br />
      <hr />
      <h3>Sign In With Email</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      <h4>Don't have an account?</h4>
      <Link to="signUp">Create Account</Link>
      {/* //TODO: Add forgot password */}
    </>
  );
};
export default SignIn;
