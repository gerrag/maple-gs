/*
 * comms_write.js
 * 
 * This file holds all the function calls to send messages
 * with the XBee module.
 * 
 */

//const { execSync } = require('child_process');
//const { ipcRenderer } = require('electron');
const SerialPort = require('serialport').SerialPort;
const port = new SerialPort({
  path: '/dev/tty-usbserial1',
  baudRate: 9600,
})

// // listener for the XBee
// parser.on('data', (data) => {
//     alert(data);
// })

// Handles errors
port.on('error', (err) => {
  console.error('Serial port error:', err);
});

// Handles close
port.on('close', () => {
  console.error('Serial port closed.');
});

// Send a message to the XBee
export function sendXbee(msg) {
  console.log(msg)
  port.write(msg, (err) => {
    if (err){
      console.err('Error writing to the serial port:', err);
      console.log(msg);
    }
    else{
      console.log('writing message to XBee:', msg);
    }
  });
}
