import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { AddBookingFormProps, Booking, Level } from "./types";
import TimePicker from "react-time-picker";
import "./AddBooking.css";

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
    <div className="booking-form">
      <Form onSubmit={handleSubmit}>
        <div className="datetime-input">
          <FormGroup>
            <Label for="date" className="date-label">Date and Time: </Label>
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
            <Label for="time" className="time-label"> At: </Label>
            <TimePicker
              name="time"
              id="time"
              disableClock={true}
              value={time}
              onChange={(newTime) => setTime(newTime as string)}
              required
            />
          </FormGroup>
        </div>

        <FormGroup>
          <Label for="cleaner">Cleaner: </Label>
          <Input
            type="select"
            name="cleaner"
            id="cleaner"
            placeholder="Select cleaner"
            value={cleaner}
            onChange={(event) => setCleaner(event.target.value)}
            required
          >
            <option value="">Select cleaner</option>
            <option value="Mohamed">Mohamed</option>
            <option value="Abdullahi">Abdullahi</option>
            <option value="Zakariye">Zakariye</option>
            <option value="Ehsan">Ehsan</option>
            <option value="Daner">Daner</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="serviceType">Service Type: </Label>
          <div>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="serviceType"
                  value={Level.Fönstertvätt}
                  checked={serviceType === Level.Fönstertvätt}
                  onChange={(event) => setServiceType(event.target.value as Level)}
                  required />
                {' '}
                {Level.Fönstertvätt}
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio"
                  name="serviceType"
                  value={Level.Basic}
                  checked={serviceType === Level.Basic}
                  onChange={(event) => setServiceType(event.target.value as Level)}
                  required />
                {' '}
                {Level.Basic}
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio"
                  name="serviceType"
                  value={Level.Topp}
                  checked={serviceType === Level.Topp}
                  onChange={(event) => setServiceType(event.target.value as Level)}
                  required />
                {' '}
                {Level.Topp}
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio"
                  name="serviceType" value={Level.Diamant}
                  checked={serviceType === Level.Diamant}
                  onChange={(event) => setServiceType(event.target.value as Level)}
                  required />
                {' '}
                {Level.Diamant}
              </Label>
            </FormGroup>
          </div>
        </FormGroup>



        <Button type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddBookingForm;
