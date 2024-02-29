import React from "react";
import { Row, Col } from "react-bootstrap";
import ControlPanel from "./ControlPanel";
import Graphs from "./Graphs";

export default function HomePage({
  logText,
  updateLog,
  heartbeatText,
  sendXbee,
  portStatus,
  openPort,
  closePort,
  accelData,
  accelMax,
}) {
  return (
    <div>
      <Row>
        <Col>
          <ControlPanel
            logText={logText}
            updateLog={updateLog}
            heartbeatText={heartbeatText}
            sendXbee={sendXbee}
            portStatus={portStatus}
            openPort={openPort}
            closePort={closePort}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Graphs accelData={accelData} accelMax={accelMax} />
        </Col>
      </Row>
    </div>
  );
}
