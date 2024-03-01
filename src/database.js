/*
 * database.js
 *
 * This file holds all the function calls to query
 * the MariaDB database
 *
 */

const mysql = require("mysql");

export const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "12346",
  database: "mapledb",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MariaDb", err);
    return;
  }
  console.log("Connected to MariaDB");
});

export function getDatasets() {
  return new Promise((resolve, reject) => {
    let queryString = "SELECT * FROM datasets";
    console.log("Query: " + queryString);
    connection.query(queryString, (error, results, fields) => {
      if (error) {
        console.error("ERROR with DB: " + error);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

export function getData(datasetID) {
  return new Promise((resolve, reject) => {
    let queryString =
      "SELECT * FROM accelData WHERE datasetID = " +
      datasetID +
      " ORDER BY placement";
    console.log("Query: " + queryString);
    connection.query(queryString, (error, results, fields) => {
      if (error) {
        console.error("ERROR with DB: " + error);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

export function getDataMax(datasetID) {
  return new Promise((resolve, reject) => {
    let queryString =
      "SELECT accelMax FROM datasets WHERE datasetID = " + datasetID;
    console.log("Query: " + queryString);
    connection.query(queryString, (error, results, fields) => {
      if (error) {
        console.error("ERROR with DB: " + error);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

export function insertDataset(date) {
  return new Promise((resolve, reject) => {
    let queryString =
      'INSERT INTO datasets (datasetID, name, accelMax) VALUES (null, "' +
      date +
      '", null)';
    console.log("Query: " + queryString);
    connection.query(queryString, (error, results, fields) => {
      if (error) {
        console.error("ERROR with DB: " + error);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

export function insertMaxAccel(datasetID, maxAccel) {
  return new Promise((resolve, reject) => {
    let queryString =
      "UPDATE datasets SET accelMax = " +
      maxAccel +
      " WHERE datasetID = " +
      datasetID;
    console.log("Query: " + queryString);
    connection.query(queryString, (error, results, fields) => {
      if (error) {
        console.error("ERROR with DB: " + error);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

export function insertAccelEntry(datasetID, position, value) {
  return new Promise((resolve, reject) => {
    let queryString =
      "INSERT INTO accelData (dataID, placement, value, datasetID) VALUES (null, " +
      position +
      ", " +
      value +
      ", " +
      datasetID +
      ")";
    console.log("Query: " + queryString);
    connection.query(queryString, (error, results, fields) => {
      if (error) {
        console.error("ERROR with DB: " + error);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}
