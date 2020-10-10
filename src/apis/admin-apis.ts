import express, { Request, Response } from 'express';
import { adminLogin } from '../db/services/admin-services'
const router = express.Router();

router.post('/admin_login', async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body
        const data = await adminLogin(username, password)
        res.status(200).json({code: 0, data});
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

export const AdminAPIs = router;