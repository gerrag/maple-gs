import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import { Tabs, Tab, Navbar, Container } from "react-bootstrap";
import HomePage from "./components/HomePage";
import PastTestPage from "./components/PastTestPage";

function App() {
  const [logText, setLogText] = useState("--- Beginning of Log ---");

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

  // useEffect(() => {
  //   ipcRenderer.on('addToLog', (event, msg) => {
  //     console.log(msg)
  //     updateLog(msg);
  //   });

  //   //cleanup
  //   return () => {
  //     ipcRenderer.removeAllListeners('addToLog');
  //   }
  // }, []);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>G08 MAPLE Ground Station</Navbar.Brand>
        </Container>
      </Navbar>

      <Tabs defaultActiveKey="home" id="gsTabs" className="mb-3" justify>
        <Tab eventKey="home" title="Home">
          <HomePage logText={logText} updateLog={updateLog} />
        </Tab>
        <Tab eventKey="pastTest" title="pastTest">
          <PastTestPage />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
