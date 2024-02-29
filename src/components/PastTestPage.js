import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import DataPanel from "./DataPanel";
import Graphs from "./Graphs";
import { getDatasets, getData, getDataMax } from "./../database";

export default function PastTestPage() {
  const [datasets, setDatasets] = useState([]);
  const [accelMax, setAccelMax] = useState(0);
  const [accelData, setAccelData] = useState([]);

  // update the datasets state
  async function updateDatasets() {
    var sets = await getDatasets();
    setDatasets(sets);
  }

  // update data based on selected dropdown item
  async function updateData(datasetID) {
    // prepare accel data for graphing
    var rawAccelData = await getData(datasetID);
    var prepAccelData = rawAccelData.map((record) => {
      return {
        name: record.placement,
        value: record.value,
      };
    });
    setAccelData(prepAccelData);

    // get accel max
    var rawAccelMax = await getDataMax(datasetID);
    setAccelMax(rawAccelMax[0].accelMax);
  }

  return (
    <div>
      <Row>
        <Col>
          <DataPanel
            datasets={datasets}
            accelData={accelData}
            updateData={updateData}
            updateDatasets={updateDatasets}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Graphs accelMax={accelMax} accelData={accelData} />
        </Col>
      </Row>
    </div>
  );
}
