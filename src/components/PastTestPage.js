import React from "react";
import { Row, Col } from "react-bootstrap";
import ControlPanel from "./ControlPanel";
import Graphs from "./Graphs";

export default function HomePage() {
  return (
    <div>
      <Row>
        <Col>
          <ControlPanel />
        </Col>
      </Row>
      <Row>
        <Col>
          <Graphs />
        </Col>
      </Row>
    </div>
  );
}
