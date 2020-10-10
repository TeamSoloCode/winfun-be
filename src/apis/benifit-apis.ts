import express, { Request, Response } from "express";
import { fetchAllBenifit, fetchExistBenifit, insertBenifit, updateBenifit } from "../db/services/benifit-service";
import { Benifit } from "../models/ModelDeclare";

const router = express.Router();

router.post("/insert_benifit", async (req: Request, res: Response) => {
  try {
    const { title, image, descriptions, show, sequence } = req.body;
    const benifit: Benifit = {
      title,
      image,
      descriptions,
      show,
      sequence,
    };
    const data = await insertBenifit(benifit);
    res.status(200).json({ code: 0, data });
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

router.put("/update_benifit", async (req: Request, res: Response) => {
  try {
    const { title, image, descriptions, show, sequence, featureId } = req.body;
    const feature: Benifit = {
      title,
      image,
      descriptions,
      show,
      sequence,
    };
    const data = await updateBenifit(featureId, feature);
    res.status(200).json({ code: 0, data });
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

router.get("/all_benifit", async (_req: Request, res: Response) => {
  try {
    const data = await fetchAllBenifit();
    res.status(200).json({ code: 0, data });
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

router.get("/all_exist_benifit", async (_req: Request, res: Response) => {
  try {
    const data = await fetchExistBenifit();
    res.status(200).json({ code: 0, data });
  } catch (err) {
    res.status(200).json({ code: 1, message: err });
  }
});

export const BenifitAPIs = router;
