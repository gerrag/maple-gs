import React from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import LogTextArea from "./LogTextArea.js";

export default function ControlPanel({
  logText,
  updateLog,
  heartbeatText,
  sendXbee,
  portStatus,
  openPort,
  closePort,
}) {
  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Control Panel</Card.Title>
        <Row className="my-3">
          <Col className="text-center">
            <Button
              id="burnWireBtn"
              className="m-3"
              variant="secondary"
              size="lg"
              disabled={!portStatus}
              onClick={() => {
                updateLog('"Burn Wire" button pressed.');
                sendXbee("com_burn");
              }}
            >
              Burn Wire
            </Button>
            <Button
              id="startHeartbeatBtn"
              className="m-3"
              variant="secondary"
              size="lg"
              disabled={!portStatus}
              onClick={() => {
                updateLog('"Start Heartbeat" button pressed.');
                sendXbee("com_hrtb");
              }}
            >
              Start Heartbeat
            </Button>
            <Button
              id="beginDropBtn"
              className="m-3"
              variant="secondary"
              size="lg"
              disabled={!portStatus}
              onClick={() => {
                updateLog('"Begin Drop Test" button pressed.');
                sendXbee("com_strt");
              }}
            >
              Begin Drop Test
            </Button>
            <Button
              id="endDropBtn"
              className="m-3"
              variant="secondary"
              size="lg"
              disabled={!portStatus}
              onClick={() => {
                updateLog('"End Drop Test" button pressed.');
                sendXbee("com_stop");
              }}
            >
              End Drop Test
            </Button>
            <Button
              id="openPortBtn"
              className="m-3"
              variant="success"
              size="lg"
              disabled={portStatus}
              onClick={() => {
                updateLog('"Open Port" button pressed.');
                openPort();
              }}
            >
              Open Port
            </Button>
            <Button
              id="closePortBtn"
              className="m-3"
              variant="danger"
              size="lg"
              disabled={!portStatus}
              onClick={() => {
                updateLog('"Close Port" button pressed.');
                closePort();
              }}
            >
              Close Port
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
              value={
                portStatus
                  ? "Serial Port Status:   Connected"
                  : "Serial Port Status:   Not Connected"
              }
            ></Form.Control>
          </Col>
          <Col>
            <Form.Control
              id="heartbeatText"
              as="textarea"
              style={{ height: "25px" }}
              disabled
              value={heartbeatText}
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
