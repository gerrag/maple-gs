import React from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import { sendXbee } from "./../comms_write.js";

export default function ControlPanel() {
  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Control Panel</Card.Title>
        <Row className="my-3">
          <Col className="text-center">
            <Button
              id="validateSystemBtn"
              className="m-3"
              variant="secondary"
              size="lg"
              onClick={() =>{
                sendXbee("It works!")
              }}
            >
              Validate System
            </Button>
            <Button
              id="startHeartbeatBtn"
              className="m-3"
              variant="secondary"
              size="lg"
            >
              Start Heartbeat
            </Button>
            <Button
              id="beginDropBtn"
              className="m-3"
              variant="secondary"
              size="lg"
            >
              Begin Drop Test
            </Button>
            <Button
              id="endDropBtn"
              className="m-3"
              variant="secondary"
              size="lg"
            >
              End Drop Test
            </Button>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <Form.Control
              id="statusText"
              as="textarea"
              style={{ height: "25px" }}
              disabled
              value={"Status:   Not Connected"}
            ></Form.Control>
          </Col>
          <Col>
            <Form.Control
              id="heartbeatText"
              as="textarea"
              style={{ height: "25px" }}
              disabled
              value={"Last Heartbeat Received:   None"}
            ></Form.Control>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <Form.Control
              id="logText"
              as="textarea"
              style={{ height: "100px" }}
              disabled
              value={"---- Beginning of Log ----"}
            ></Form.Control>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
