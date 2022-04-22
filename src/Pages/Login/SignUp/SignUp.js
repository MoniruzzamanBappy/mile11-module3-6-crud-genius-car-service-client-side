import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import auth from "./../../../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import SocialLogin from "../SocialLogin/SocialLogin";
import PageTitle from "../../Shared/PageTitle/PageTitle";

const SignUp = () => {
  //     const emailRef = useRef("");
  //   const passRef = useRef("");
  //   const nameRef = useRef("");

  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, error1] = useUpdateProfile(auth);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const pass = event.target.pass.value;
    // const agree= event.target.terms.checked;
    // if(agree){
    //   createUserWithEmailAndPassword(email, pass);
    // }
    await createUserWithEmailAndPassword(email, pass);
    await updateProfile({ displayName: name });
    navigate("/home");
  };
  const handleToLogin = (event) => {
    navigate("/login");
  };
  if (user) {
    navigate("/home");
  }
  return (
    <div className="container w-50 mx-auto">
      <PageTitle title="Signup"></PageTitle>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center mb-3">Please Sign Up</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="pass" type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group
          onClick={() => setAgree(!agree)}
          className="mb-3"
          controlId="formBasicCheckbox"
        >
          <Form.Check
            className={agree ? "text-primary" : "text-danger"}
            name="terms"
            type="checkbox"
            required
            label="Accept Genius Car Terms and Condition"
          />
        </Form.Group>
        <Button disabled={!agree} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p className="mt-3">
        Already have an account?{" "}
        <span className="text-primary signup" onClick={handleToLogin}>
          Click here
        </span>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default SignUp;
