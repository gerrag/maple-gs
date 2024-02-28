import React, { PureComponent } from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Graphs({ accelMax, accelData }) {
  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Collected Data</Card.Title>
        <div className="m-5" height="100%" width="100%">
          <h3>Accelerometer Data</h3>
          <Row>
            <Col sm={10}>
              <Form.Control
                id="accelMaxText"
                as="textarea"
                style={{ height: "25px" }}
                disabled
                value={"Max acceleration: " + accelMax}
              ></Form.Control>
            </Col>
          </Row>
          <LineChart id="accelChart" height={300} width={1400} data={accelData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </div>
      </Card.Body>
    </Card>
  );
}
