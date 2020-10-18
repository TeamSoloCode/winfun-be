import express, { Request, Response } from 'express';
// import path from 'path'
// import { writeIntoJSONFile } from '../utils';
import { fetchEmailConfigById, updateEmailConfig } from "../db/services/email-config-services"
import { EmailConfig } from '../models/ModelDeclare';

const router = express.Router();

router.get('/fetch_email_config/:id', async (req: Request, res: Response) => {
    try{
        // const emailConfigPath = path.resolve("./emailConfig.json")
        // var content = JSON.parse(fs.readFileSync(emailConfigPath, 'utf8'));
        // /** Shouldn't send the password to client */
        // delete content.hostEmailPassword
        const { id } = req.params
        if(id){
            const data = await fetchEmailConfigById(Number(id))
            delete data.sendingEmailPassword
            res.status(200).json({ code: 0, data });
            return
        }

        res.status(200).json({ code: 0, data: [] });
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

router.post('/update_email_config', async (req: Request, res: Response) => {
    try{
        // const emailConfigPath = path.resolve("./src/emailConfig.json")
        // const content = writeIntoJSONFile(emailConfigPath, emailConfig)

        const {emailConfigId, receivingEmails, emailSubject } = req.body
        const emailConfig : EmailConfig = {} as EmailConfig
        emailConfig.receivingEmails = receivingEmails;
        emailConfig.emailSubject = emailSubject;

        const data = await updateEmailConfig(emailConfigId, emailConfig)
        res.status(200).json({code: 0, data});
    }
    catch(err){
        res.status(200).json({code: 1, message: err.message});
    }
})

export const EmailInfoAPIs = router;