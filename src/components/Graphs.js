import React, { PureComponent } from "react";
import { Row, Col, Button, Card, Form, } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Graphs() {
  const data = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 28 },
    { name: "Apr", value: 82 },
    { name: "May", value: 67 },
    { name: "Jun", value: 50 },
  ];

  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Collected Data</Card.Title>
        <div className='m-5' height='100%' width='100%'>
            <LineChart height={300} width={1400} data={data}>
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
