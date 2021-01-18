import React from "react";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// import { Link } from "@reach/router";


const NotFound = () => {

    return (
        <>
            <h1>404</h1>
            <h2>Oops! Looks like this page doesn't exist!</h2>
            <Link to='/'>
                Go back to home
            </Link>
        </>

  );
};
export default NotFound;