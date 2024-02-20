import React from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import LogTextArea from "./LogTextArea.js";
import { sendXbee } from "./../comms_write.js";

export default function ControlPanel({ logText, updateLog }) {
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
              onClick={() => {
                sendXbee("com_burn"); //TODO change this back to validate
                updateLog("\"Validate Systems\" button pressed.");
              }}
            >
              Validate System (set to burn wire)
            </Button>
            <Button
              id="startHeartbeatBtn"
              className="m-3"
              variant="secondary"
              size="lg"
              onClick={() => {
                sendXbee("com_hrtb");
                updateLog("\"Start Heartbeat\" button pressed.");
              }}
            >
              Start Heartbeat
            </Button>
            <Button
              id="beginDropBtn"
              className="m-3"
              variant="secondary"
              size="lg"
              onClick={() => {
                sendXbee("com_strt");
                updateLog("\"Begin Drop Test\" button pressed.");
              }}
            >
              Begin Drop Test
            </Button>
            <Button
              id="endDropBtn"
              className="m-3"
              variant="secondary"
              size="lg"
              onClick={() => {
                sendXbee("com_stop");
                updateLog("\"End Drop Test\" button pressed.");
              }}
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
            <LogTextArea id="logTextArea" logText={logText}></LogTextArea>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
