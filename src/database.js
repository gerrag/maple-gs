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
    connection.query("SELECT * FROM datasets", (error, results, fields) => {
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
    var queryString =
      "SELECT * FROM accelData WHERE datasetID = " +
      datasetID +
      " ORDER BY placement";
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
    var queryString =
      "SELECT accelMax FROM datasets WHERE datasetID = " + datasetID;
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
