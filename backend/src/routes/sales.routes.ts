import { verifyToken } from "../middleware/auth.middleware";
import { Router } from "express";
import {
  getSales,
  createSale,
} from "../controllers/sales.controller";

const router = Router();

router.get("/",verifyToken, getSales);

router.post("/", verifyToken, createSale);

export default router;