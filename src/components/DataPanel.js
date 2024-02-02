import React from "react";
import { Row, Col, Button, Dropdown, Card, Form } from "react-bootstrap";

export default function DataPanel() {
  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Data Panel</Card.Title>
        <Row className="my-3 text-center">
          <Col sm={2}>
            <Dropdown>
              <Dropdown.Toggle id="dataPanelToggle" variant="secondary">
                Choose Dataset
              </Dropdown.Toggle>
              <Dropdown.Menu id="dataPanelMenu">
                <Dropdown.Item>
                  Test Item 1
                </Dropdown.Item>
                <Dropdown.Item>
                  Test Item 2
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm={10}>
            <Form.Control
              id="currentDataText"
              as="textarea"
              style={{ height: "25px" }}
              disabled
              value={"Current Data:   None"}
            ></Form.Control>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <Form.Control
              id="rawDataText"
              as="textarea"
              style={{ height: "100px" }}
              disabled
              value={"---- Raw Data ----"}
            ></Form.Control>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
