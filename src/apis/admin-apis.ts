import express, { Request, Response } from "express";
import fs from 'fs'
import path from 'path'
import { adminLogin, updateAdminToken } from "../db/services/admin-services";
import jwt from "jsonwebtoken";
const privateKey = fs.readFileSync(path.resolve("./jwtSecretKey.key"));
const router = express.Router();

router.post("/admin_login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const data = await adminLogin(username, password);
    
    if (data.length <= 0) {
      res.status(200).json({ code: 1, message: "Admin is not exist !!" });
      return;
    }

    jwt.sign({ username: data.username, email: data.email }, privateKey, {expiresIn: "24h"}, 
    async (err, token) => {
        if(err) {
            throw err.message
        }
        if(token) await updateAdminToken(data[0].id, token)
        res.status(200).json({ code: 0, data: token });
    });
    
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

export const AdminAPIs = router;
