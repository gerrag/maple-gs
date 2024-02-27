import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import { Tabs, Tab, Navbar, Container } from "react-bootstrap";
import HomePage from "./components/HomePage";
import PastTestPage from "./components/PastTestPage";

const SerialPort = require("serialport").SerialPort;

// opens the serial port on startup
var port = new SerialPort({
  path: "/dev/ttyUSB0",
  baudRate: 115200,
});;

function App() {
  const [logText, setLogText] = useState("--- Beginning of Log ---");
  console.log(port);
  const [portStatus, setPortStatus] = useState(!!port.port);

  if (portStatus) {
    // Listen for data from the serial port
    port.on("data", (data) => {
      updateLog("Received data: " + data.toString());
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
    if(portStatus) {
      updateLog("ERROR: Attempting to open an already opened port.");
    }
    else {
      port.open();
    }
  }

  // closes the opened serial port
  function closePort() {
    if(!portStatus) {
      updateLog("ERROR: Attempting to close an already closed port.");
    }
    else {
      port.close();
    }
  }

  // This is hard coded for the final test
  function createMessage(msg) {
    var msgArray;

    // set message
    if (msg == "com_burn") {
      msgArray = [0x7E, 0x00, 0x16, 0x10, 0x01, 0x00, 0x13, 0xA2, 0x00, 0x42, 0x3F, 0x4B, 0x9F, 0xFF, 0xFE, 0x00, 0x00, 0x63, 0x6F, 0x6D, 0x5F, 0x62, 0x75, 0x72, 0x6E, 0x7C];
    } else if (msg == "com_hrtb") {
      msgArray = [0x7E, 0x00, 0x16, 0x10, 0x01, 0x00, 0x13, 0xA2, 0x00, 0x42, 0x3F, 0x4B, 0x9F, 0xFF, 0xFE, 0x00, 0x00, 0x63, 0x6F, 0x6D, 0x5F, 0x68, 0x72, 0x74, 0x62, 0x83];
    } else if (msg == "com_strt") {
      msgArray = [0x7E, 0x00, 0x16, 0x10, 0x01, 0x00, 0x13, 0xA2, 0x00, 0x42, 0x3F, 0x4B, 0x9F, 0xFF, 0xFE, 0x00, 0x00, 0x63, 0x6F, 0x6D, 0x5F, 0x73, 0x74, 0x72, 0x74, 0x66];
    } else if (msg == "com_stop") {
      msgArray = [0x7E, 0x00, 0x16, 0x10, 0x01, 0x00, 0x13, 0xA2, 0x00, 0x42, 0x3F, 0x4B, 0x9F, 0xFF, 0xFE, 0x00, 0x00, 0x63, 0x6F, 0x6D, 0x5F, 0x73, 0x74, 0x6F, 0x70, 0x6D];
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
    return "[" + dateString + "] ";
  };

  const updateLog = (msg) => {
    setLogText(logText + "\n" + getCurDateTime() + msg);
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
            sendXbee={sendXbee}
            portStatus={portStatus}
            openPort={openPort}
            closePort={closePort}
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
