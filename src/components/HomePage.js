import React from "react";
import { Row, Col } from "react-bootstrap";
import ControlPanel from "./ControlPanel";
import Graphs from "./Graphs";
import { log } from "util";

export default function HomePage({ logText, updateLog }) {
  return (
    <div>
      <Row>
        <Col>
          <ControlPanel logText={logText} updateLog={updateLog} />
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
