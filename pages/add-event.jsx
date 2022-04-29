import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Card, Button, Form } from "react-bootstrap";

const EventPage = () => {
  const eventTitle = React.useRef();
  const eventDate = React.useRef();
  const eventTime = React.useRef();
  const eventDescription = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/addEvent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: eventTitle.current.value,
        date: eventDate.current.value,
        time: eventTime.current.value,
        description: eventDescription.current.value
      })
    });
    if (response.status == 200) {
      alert("Your event is added!");
      eventTitle.current.value = "";
      eventDate.current.value = "";
      eventTime.current.value = "";
      eventDescription.current.value = "";
    } else {
      alert("Error!");
    }
  };

  return (
    <Container className="md-container">
      <Head>
        <title>Social Events</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
        <h1>Social Events</h1>
        <p>
          Share and attend <Link href="/">events</Link> ..
        </p>
        <Container>
          <Row className="justify-content-md-between">
            <Card className="sml-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="form.eventTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter event title"
                      ref={eventTitle}
                    />
                  </Form.Group>
                  <Form.Group controlId="form.eventDate">
                    <Form.Label>Event date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter event date"
                      ref={eventDate}
                    />
                  </Form.Group>
                  <Form.Group controlId="form.eventTime">
                    <Form.Label>Event time</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="Enter event time"
                      ref={eventTime}
                    />
                  </Form.Group>
                  <Form.Group controlId="form.eventDescription">
                    <Form.Label>Event description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write something about your event.."
                      ref={eventDescription}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button className="btn btn-primary" type="submit">
                      Send
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </Container>

      <footer className="cntr-footer">
        <p>Social Events (c) 2022</p>
      </footer>
    </Container>
  );
};
export default EventPage;
