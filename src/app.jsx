import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import { Tabs, Tab, Navbar, Container } from "react-bootstrap";
import HomePage from "./components/HomePage";
import PastTestPage from "./components/PastTestPage";

const SerialPort = require("serialport").SerialPort;

var port = null;

// open the serial port on startup
openSerialPort();

// opens the serial port
function openSerialPort() {
  port = new SerialPort({
    path: "/dev/ttyUSB0",
    baudRate: 115200,
  });
}

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
      console.error("Serial port error:", err);
      updateLog("Serial port error:" + err);
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
      openSerialPort();
      updateLog("Serial port is opened.");
    }
  }

  // closes the opened serial port
  function closePort() {
    if(!portStatus) {
      updateLog("ERROR: Attempting to close an already closed port.");
    }
    else {
      port.close();
      updateLog("Serial port is closed.");
    }
  }

  // TODO Create message to send
  // This will be hard coded for the final test
  function createMessage(msg) {
    var msgArray = [0x7e, 0x00, 0x16, 0x10, 0x01];

    /*
    // proto mac address
    msgArray.push(0x00);
    msgArray.push(0x13);
    msgArray.push(0xA2);
    msgArray.push(0x00);
    msgArray.push(0x42);
    msgArray.push(0x3F);
    msgArray.push(0x4A);
    msgArray.push(0xAF);
    
    // v2 mac address
    msgArray.push(0x00);
    msgArray.push(0x13);
    msgArray.push(0xA2);
    msgArray.push(0x00);
    msgArray.push(0x42);
    msgArray.push(0x3F);
    msgArray.push(0x4A);
    msgArray.push(0xAE);
    
    // v3 ac address
    msgArray.push(0x00);
    msgArray.push(0x13);
    msgArray.push(0xA2);
    msgArray.push(0x00);
    msgArray.push(0x42);
    msgArray.push(0x3F);
    msgArray.push(0x4B);
    msgArray.push(0x9F);
    */

    msgArray.push(0xff);
    msgArray.push(0xfe);
    msgArray.push(0x00);
    msgArray.push(0x00);

    // Add message and checksum
    if (msg == "com_burn") {
    } else if (msg == "com_hrtb") {
    } else if (msg == "com_hrtb") {
    } else if (msg == "com_hrtb") {
    } else {
      console.error("ERROR: Cannot create message based on function input.");
    }

    return msgArray;
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
