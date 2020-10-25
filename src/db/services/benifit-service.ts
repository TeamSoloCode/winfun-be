import mysql from "mysql";
import { tableNames } from "../database-constant";
import { Feature } from "../../models/ModelDeclare";
import { preparedData } from "../../utils";
const mySQLConfig = require("../dbconfig.json");

export function insertBenifit(feature: Feature): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    let { title, descriptions, image, show, sequence } = feature;

    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO ${tableNames.BENIFITS} 
        SET 
        \`title\` = ${preparedData(title)}, 
        \`descriptions\` = ${preparedData(descriptions)}, 
        \`show\` = ${show || 1},
        \`sequence\` = ${sequence || null},
        \`image\` = ${preparedData(image)}`.replace(/\n/g, ""),
        async (error, result) => {
          connection.end();
          if (error) {
            reject(error);
            return;
          }
          const insertedData = await fetchBenifitById(result.insertId);
          resolve(insertedData);
        }
      );
    });
  } catch (err) {
    throw err;
  }
}

export function updateBenifit(benifitId: number, feature: Feature): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    let { title, descriptions, image, show, sequence } = feature;
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${tableNames.BENIFITS}
        SET
        title = ${preparedData(title)},
        descriptions = ${preparedData(descriptions)},
        \`show\` = ${show},
        sequence = ${sequence || null},
        image = ${preparedData(image)}
        WHERE id = ${benifitId}`.replace(/\n/g, ""),
        async (error) => {
          connection.end();
          if (error) {
            reject(error);
            return;
          }
          const updatedEvent = await fetchBenifitById(benifitId);
          resolve(updatedEvent);
        }
      );
    });
  } catch (err) {
    throw err;
  }
}

export function fetchAllBenifit(): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.BENIFITS}`, (error, result) => {
        connection.end();
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  } catch (err) {
    throw err;
  }
}

export function fetchBenifitById(benifitId: number): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.BENIFITS} WHERE id = ${benifitId} LIMIT 1`, (error, result) => {
        connection.end();
        if (error) {
          reject(error);
          return;
        }

        resolve(result[0]);
      });
    });
  } catch (err) {
    throw err;
  }
}

export function fetchExistBenifit(): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.BENIFITS} WHERE deleted != 1 AND \'show\' != 0`, (error, result) => {
        connection.end();
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  } catch (err) {
    throw err;
  }
}
