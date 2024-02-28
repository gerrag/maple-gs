import React, { useState } from "react";
import { Row, Col, Button, Dropdown, Card, Form } from "react-bootstrap";

export default function DataPanel({
  datasets,
  accelData,
  updateData,
  updateDatasets,
}) {
  const [chosenDataset, setChosenDataset] = useState("None");

  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Data Panel</Card.Title>
        <Row className="my-3 text-center">
          <Col sm={2}>
            <Dropdown>
              <Dropdown.Toggle
                id="dataPanelToggle"
                variant="secondary"
                onClick={() => {
                  updateDatasets();
                }}
              >
                Choose Dataset
              </Dropdown.Toggle>
              <Dropdown.Menu id="dataPanelMenu">
                {datasets.map((dataset) => (
                  <Dropdown.Item
                    key={dataset.datasetID}
                    onClick={() => {
                      updateData(dataset.datasetID);
                      setChosenDataset(dataset.name);
                    }}
                  >
                    {dataset.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm={10}>
            <Form.Control
              id="currentDataText"
              as="textarea"
              style={{ height: "25px" }}
              disabled
              value={"Current Dataset: " + chosenDataset}
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
              value={
                "---- Raw Data ----" +
                accelData
                  .map(
                    (record) =>
                      "\n(pos: " +
                      record.name +
                      ", value: " +
                      record.value +
                      ")"
                  )
                  .toString()
              }
            ></Form.Control>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
