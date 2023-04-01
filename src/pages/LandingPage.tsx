import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "../App.css"

const LandingPage = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [nameEntered, setNameEntered] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNameEntered(true)
    navigate(`/bookings/${customerName}`);
  };


  return (
    <div className="landing-page">
      <h1>Welcome to CleanBooking!</h1>
      <p>Book your cleaning appointment today!</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="customerName">Customer Name:</Label>
          <Input
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Book Now
        </Button>
        {nameEntered}
      </Form>
    </div>
  );
};

export default LandingPage;
