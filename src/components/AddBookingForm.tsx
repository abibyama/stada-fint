import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { AddBookingFormProps, Booking, Level } from "./types";
import TimePicker from "react-time-picker";

const AddBookingForm: React.FC<AddBookingFormProps> = ({ addBooking }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [cleaner, setCleaner] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const booking: Booking = {
      _id: '',
      date: new Date(date),
      time,
      serviceType: serviceType as Level,
      cleaner,
      completed: false
    };

    try {
      await addBooking(booking)
      setDate("");
      setTime("");
      setServiceType("");
      setCleaner("");
    } catch (error) {
      console.log(error);
    }
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
        <TimePicker
          name="time"
          id="time"
          disableClock={true}
          value={time}
          onChange={(newTime) => setTime(newTime as string)}
          required
        />
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
      <Button color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddBookingForm;
