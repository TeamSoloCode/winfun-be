import mysql from "mysql";
import { preparedData } from "../../utils";
import { tableNames } from "../database-constant";
const mySQLConfig = require("../dbconfig.json");

export function adminLogin(username: string, password: string): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();

    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${tableNames.ADMINS} 
        WHERE username=${preparedData(username)} and password=${preparedData(
          password
        )}`.replace(/\n/g, ""),
        (error, result) => {
          connection.end();
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );
    });
  } catch (err) {
    throw err;
  }
}

export function updateAdminToken(adminId: number, token: string): Promise<any> {
  try {
    const connection = mysql.createConnection(mySQLConfig);
    connection.connect();
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${tableNames.ADMINS}
        SET
        token = ${preparedData(token)}
        WHERE id = ${adminId}`.replace(/\n/g, ""),
        async (error) => {
          connection.end();
          if (error) {
            reject(error);
            return;
          }
          resolve(true);
        }
      );
    });
  } catch (err) {
    throw err;
  }
}
