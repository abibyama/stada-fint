import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Cleaner, Level } from "../types";
import axios from "axios";

const AddBookingForm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [cleaner, setCleaner] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const booking = {
      date,
      time,
      serviceType,
      cleaner,
    };
    axios.post("http://localhost:4000/bookings/", booking).then((res) => console.log(res.data));
    setDate("");
    setTime("");
    setServiceType("");
    setCleaner("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="date">Date</Label>
        <Input
          type="date"
          name="date"
          id="date"
          placeholder="Select date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="time">Time</Label>
        <Input
          type="select"
          name="time"
          id="time"
          placeholder="Select time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
        >
          <option value="">Select time</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="serviceType">Service Type</Label>
        <Input
          type="select"
          name="serviceType"
          id="serviceType"
          placeholder="Select service type"
          value={serviceType}
          onChange={(event) => setServiceType(event.target.value as Level)}
          required
        >
          <option value="">Select service type</option>
          <option value={Level.Fönstertvätt}>{Level.Fönstertvätt}</option>
          <option value={Level.Basic}>{Level.Basic}</option>
          <option value={Level.Topp}>{Level.Topp}</option>
          <option value={Level.Diamant}>{Level.Diamant}</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="cleaner">Cleaner</Label>
        <Input
          type="text"
          name="cleaner"
          id="cleaner"
          placeholder="Enter cleaner name"
          value={cleaner}
          onChange={(event) => setCleaner(event.target.value)}
          required
        />
      </FormGroup>
      <Button color="primary">Submit</Button>
    </Form>
  );
};

export default AddBookingForm;
