import React, { useRef } from "react";
import "./Login.css";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "./../../../firebase.init";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import axios from "axios";

const Login = () => {
  const emailRef = useRef("");
  const passRef = useRef("");
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  let errorElement;

  const [signInWithEmailAndPassword, user, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, error1] =
    useSendPasswordResetEmail(auth);
   

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const pass = passRef.current.value;
     await signInWithEmailAndPassword(email, pass);
     const {data} = await axios.post('http://localhost:5000/login', {email});
     localStorage.setItem('accessToken', data.accessToken)
     navigate(from, { replace: true });

  };
  const handleResetPassword = async (event) => {
    const email = emailRef.current.value;
    if(email){
      await sendPasswordResetEmail(email);
    toast("Sent email");
    }
    else{
      toast("Please enter your email");
    }
  };
  const handleToSignup = (event) => {
    navigate("/signup");
  };
  if (error || error1) {
    errorElement = (
      <div>
        <p className="text-danger">Error: {error?.message}</p>
      </div>
    );
  }
  if (user) {
    // navigate(from, { replace: true });
  }
  return (
    <div className="container w-50 mx-auto">
      <PageTitle title="Login"></PageTitle>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center">Please Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={passRef} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {errorElement}
      <p className="mt-3">
        Dont have an account?{" "}
        <span className="text-primary signup" onClick={handleToSignup}>
          Click here
        </span>
      </p>
      <ToastContainer />
      <p className="mt-3">
        Forget password?{" "}
        <span className="text-primary signup" onClick={handleResetPassword}>
          Click here
        </span>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
