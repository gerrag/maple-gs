import React, { useState } from "react";
import { Tabs, Tab, Navbar, Container } from "react-bootstrap";
import HomePage from "./components/HomePage";
import PastTestPage from "./components/PastTestPage";
import { insertDataset, insertMaxAccel, insertAccelEntry } from "./database";

const SerialPort = require("serialport").SerialPort;

// opens the serial port on startup
var port = new SerialPort({
  path: "/dev/ttyUSB0",
  baudRate: 115200,
});

function App() {
  const [logText, setLogText] = useState("--- Beginning of Log ---");
  const [portStatus, setPortStatus] = useState(!!port.port);
  const [heartbeatText, setHeartbeatText] = useState(
    "Last Heartbeat Received:   None"
  );
  const [curMaxAccelData, setCurMaxAccelData] = useState(0);
  const [curAccelData, setCurAccelData] = useState([]);
  const [datasetID, setDatasetID] = useState(null);

  var updatableAccelData = [];

  if (portStatus) {
    // Listen for data from the serial port
    port.on("data", (data) => {
      updateLog("Received data: " + data.toString());
      handleData(data.toString());
    });

    // Handles errors
    port.on("error", (err) => {
      console.error("Serial port error: ", err);
      updateLog("Serial port error: " + err);
    });

    // Handles open
    port.on("open", () => {
      console.error("Serial port opened.");
      updateLog("Serial port opened.");
      setPortStatus(true);
    });

    // Handles close
    port.on("close", () => {
      console.error("Serial port closed.");
      updateLog("Serial port closed.");
      setPortStatus(false);
    });
  }

  // opens the serial port
  function openPort() {
    if (portStatus) {
      updateLog("ERROR: Attempting to open an already opened port.");
    } else {
      port.open();
    }
  }

  // closes the opened serial port
  function closePort() {
    if (!portStatus) {
      updateLog("ERROR: Attempting to close an already closed port.");
    } else {
      port.close();
    }
  }

  // handles incoming data from serialport
  async function handleData(msg) {
    if (msg.startsWith("x") && msg.endsWith("q")) {
      var command = msg.slice(1, -1).split("_");

      // handle acks
      if (command[0] === "ack") {
        // heartbeat
        if (command[1] === "hrtb") {
          setHeartbeatText("Last Heartbeat Received:   " + getCurDateTime());
        }
        // burn wire
        else if (command[1] === "burn") {
          console.log("ACK Received: burn");
          updateLog("ACK Received: burn");
        }
        // start test
        else if (command[1] === "strt") {
          console.log("ACK Received: strt");
          updateLog("ACK Received: strt");

          // Create new dataset
          var insertPacket = await insertDataset(getCurDateTime());
          setDatasetID(insertPacket.insertId);
        } else {
          console.error("Could not identify ACK message: " + msg);
          updateLog("Could not identify ACK message: " + msg);
        }
      }

      // handle acc data
      else if (command[0] === "acc") {
        if (!isNaN(command[1]) && !isNaN(command[2])) {
          // update displayed data
          updatableAccelData.push({
            name: parseInt(command[1]),
            value: parseFloat(command[2]),
          });
          setCurAccelData(updatableAccelData);
          // insert data into database
          await insertAccelEntry(
            datasetID,
            parseInt(command[1]),
            parseFloat(command[2])
          );
        } else if (command[1] === "max" && !isNaN(command[2])) {
          // update displayed data
          setCurMaxAccelData(parseFloat(command[2]));
          // insert max data into database
          await insertMaxAccel(datasetID,parseFloat(command[2]));
        } else {
          console.error("Could not identify acc message: " + msg);
          updateLog("Could not identify acc message: " + msg);
        }
      }

      // otherwise
      else {
        console.error("Could not identify message: " + msg);
        updateLog("Could not identify message: " + msg);
      }
    } else {
      console.error("Could not identify packet: " + msg);
      updateLog("Could not identify packet: " + msg);
    }
  }

  // This is hard coded for the final test
  function createMessage(msg) {
    var msgArray;

    // set message
    if (msg == "com_burn") {
      msgArray = [
        0x7e, 0x00, 0x16, 0x10, 0x01, 0x00, 0x13, 0xa2, 0x00, 0x42, 0x3f, 0x4b,
        0x9f, 0xff, 0xfe, 0x00, 0x00, 0x63, 0x6f, 0x6d, 0x5f, 0x62, 0x75, 0x72,
        0x6e, 0x7c,
      ];
    } else if (msg == "com_hrtb") {
      msgArray = [
        0x7e, 0x00, 0x16, 0x10, 0x01, 0x00, 0x13, 0xa2, 0x00, 0x42, 0x3f, 0x4b,
        0x9f, 0xff, 0xfe, 0x00, 0x00, 0x63, 0x6f, 0x6d, 0x5f, 0x68, 0x72, 0x74,
        0x62, 0x83,
      ];
    } else if (msg == "com_strt") {
      msgArray = [
        0x7e, 0x00, 0x16, 0x10, 0x01, 0x00, 0x13, 0xa2, 0x00, 0x42, 0x3f, 0x4b,
        0x9f, 0xff, 0xfe, 0x00, 0x00, 0x63, 0x6f, 0x6d, 0x5f, 0x73, 0x74, 0x72,
        0x74, 0x66,
      ];
    } else if (msg == "com_stop") {
      msgArray = [
        0x7e, 0x00, 0x16, 0x10, 0x01, 0x00, 0x13, 0xa2, 0x00, 0x42, 0x3f, 0x4b,
        0x9f, 0xff, 0xfe, 0x00, 0x00, 0x63, 0x6f, 0x6d, 0x5f, 0x73, 0x74, 0x6f,
        0x70, 0x6d,
      ];
    } else {
      console.error("ERROR: Cannot create message based on function input.");
    }

    return new Buffer(msgArray);
  }

  // Send a message to the XBee
  function sendXbee(msg) {
    console.log("sending the message: " + msg);
    port.write(createMessage(msg), (err) => {
      if (err) {
        console.err("Error writing to the serial port:", err);
        console.log(msg);
      } else {
        console.log("writing message to XBee:", msg);
      }
    });
  }

  const getCurDateTime = () => {
    var curDate = new Date();
    var dateString =
      curDate.toISOString().substring(0, 10) +
      " " +
      curDate.toTimeString().substring(0, 8) +
      curDate.toISOString().substring(19, 23);
    return "[" + dateString + "]";
  };

  const updateLog = (msg) => {
    setLogText(logText + "\n" + getCurDateTime() + " " + msg);
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>G08 MAPLE Ground Station</Navbar.Brand>
        </Container>
      </Navbar>

      <Tabs defaultActiveKey="home" id="gsTabs" className="mb-3" justify>
        <Tab eventKey="home" title="Home">
          <HomePage
            logText={logText}
            updateLog={updateLog}
            heartbeatText={heartbeatText}
            sendXbee={sendXbee}
            portStatus={portStatus}
            openPort={openPort}
            closePort={closePort}
            accelData={curAccelData}
            accelMax={curMaxAccelData}
          />
        </Tab>
        <Tab eventKey="pastTest" title="pastTest">
          <PastTestPage />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
