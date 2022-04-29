import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Card, Container, Row } from "react-bootstrap";
import { Pool } from "pg/lib";
import { config } from "../config";
const pool = new Pool(config);

const PeoplePage = ({ people }) => {
  return (
    <Container className="md-container">
      <Head>
        <title>Social Events</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
        <Container>
          <h1>Social Events</h1>
          <p>
            <Link href="add-event">Share</Link> and attend{" "}
            <Link href="/">events</Link> ..
          </p>
          <Row className="justify-content-md-between">
            {people.map((p) => (
              <Card key={p.id} className="sml-card">
                <Card.Body>
                  <Card.Text>{p.name}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      </Container>
      <footer className="cntr-footer">
        <p>Social Events (c) 2022</p>
      </footer>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { eventId } = context.params;
  console.log(eventId);
  const query = `SELECT * FROM people WHERE event_id='${eventId}';`;

  const people = [];
  const client = await pool.connect();
  const res = await client.query(query);
  if (res.rows.length > 0) {
    res.rows.forEach((row) => {
      people.push(row);
    });
  }
  return {
    props: { people }
  };
}

export default PeoplePage;
