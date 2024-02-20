import React from "react";
import { Form } from "react-bootstrap";

export default function LogTextArea({ logText }) {
  return (
    <Form.Control
      as="textarea"
      value={logText}
      style={{ height: "100px" }}
      readOnly
      disabled
    />
  );
}
