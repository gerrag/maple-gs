import React from "react";
import { Tabs, Tab, Navbar, Container } from 'react-bootstrap';
import HomePage from "./components/HomePage";
import PastTestPage from "./components/PastTestPage";

function App() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>G08 MAPLE Ground Station</Navbar.Brand>
        </Container>
      </Navbar>

      <Tabs
        defaultActiveKey="home"
        id="gsTabs"
        className="mb-3"
        justify
      >
        <Tab eventKey="home" title="Home">
          <HomePage />
        </Tab>
        <Tab eventKey="pastTest" title="pastTest">
          <PastTestPage />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
