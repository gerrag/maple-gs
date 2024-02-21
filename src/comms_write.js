/*
 * comms_write.js
 *
 * This file holds all the function calls to send messages
 * with the XBee module.
 *
 */

//const { execSync } = require('child_process');
//const { ipcRenderer } = require('electron');
//const { ipcRenderer } = require('electron');
const SerialPort = require("serialport").SerialPort;
const port = new SerialPort({
  path: "/dev/ttyUSB0",
  baudRate: 115200,
});

// Handles errors
port.on("error", (err) => {
  console.error("Serial port error:", err);
});

// Handles close
port.on("close", () => {
  console.error("Serial port closed.");
});

// Listen for data from the serial port
port.on('data', (data) => {
  console.log('Received data:', data.toString());
});

// Send a message to the XBee
export function sendXbee(msg) {
  console.log("sending the message: " + msg);
  //ipcRenderer.send('addToLog', 'myarg');
  port.write(msg, (err) => {
    if (err) {
      console.err("Error writing to the serial port:", err);
      console.log(msg);
    } else {
      console.log("writing message to XBee:", msg);
    }
  });
}
