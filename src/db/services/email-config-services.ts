import mysql from "mysql";
import { tableNames } from "../database-constant";
import { EmailConfig } from "../../models/ModelDeclare";
import { preparedData } from "../../utils";
const mySQLConfig = require("../dbconfig.json");

export function updateEmailConfig(emailConfigId: number, emailConfig: EmailConfig): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    let { emailSubject, receivingEmails } = emailConfig;
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${tableNames.EMAIL_CONFIG}
        SET
        emailSubject = ${preparedData(emailSubject)},
        receivingEmails = ${preparedData(receivingEmails)}
        WHERE id = ${emailConfigId}`.replace(/\n/g, ""),
        async (error) => {
          connection.end();
          if (error) {
            reject(error);
            return;
          }
          const updatedEvent = await fetchEmailConfigById(emailConfigId);
          resolve(updatedEvent);
        }
      );
    });
  } catch (err) {
    throw err;
  }
}

export function fetchEmailConfigById(emailConfigId: number): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${tableNames.EMAIL_CONFIG} WHERE id = ${emailConfigId} LIMIT 1`,
        (error, result) => {
          connection.end();
          if (error) {
            reject(error);
            return;
          }

          resolve(result[0]);
        }
      );
    });
  } catch (err) {
    throw err;
  }
}

export function fetchAllEmailConfig(): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableNames.EMAIL_CONFIG}`, (error, result) => {
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
