import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useServiceDetail from "../../../hook/useServiceDetail";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  const handleSubmitCheckout = (e) => {
    e.preventDefault();
    const order = {
      email: user.email,
      service: service.name,
      serviceId: serviceId,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };

    axios.post("http://localhost:5000/order", order)
    .then((response) => {
      const {data} = response;
      if(data.insertedId){
        toast(`${service?.name} is added to your order list`);
        e.target.reset();
        navigate('/orders')
      }
    });
  };
  return (
    <div>
      <PageTitle title="Checkout"></PageTitle>
      <h1>here you can check out: {service?.name}</h1>
      <div>
        <Form onSubmit={handleSubmitCheckout} className="container my-5">
          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required readOnly
              type="text"
              name="name"
              value={user?.displayName}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required readOnly
              type="email"
              name="email"
              value={user?.email}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Service</Form.Label>
            <Form.Control name="service" value={service?.name} readOnly  required placeholder={service?.name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              required
              placeholder="Apartment, studio, or floor"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridCity">
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" required placeholder="Enter phone no" />
          </Form.Group>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check required type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
