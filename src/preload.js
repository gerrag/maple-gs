// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// const {contextBridge, ipcRenderer} = require('electron');

// const { ipcRenderer } = require('electron');

// window.electron = {
//   send: (channel, data) => {
//     ipcRenderer.send('addToLog', data);
//   },
//   receive: (channel, func) => {
//     ipcRenderer.on('addToLog', (event, ...args) => console.log(...args));
//   }
// };

// contextBridge.exposeInMainWorld('electron', {
//   send: (channel, data) => {
//     //whitelist channels
//     let validChannels = ['addToLog'];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.send(channel, data);
//     }
//   },
//   receive: (channel, func) => {
//     let validChannels = ['addToLog'];
//     if (validChannels.includes(channel)) {
//       // Deliberately strip event as it includes 'sender'
//       ipcRenderer.on(channel, (event, ...args) => func(...args));
//     }
//   }
// });