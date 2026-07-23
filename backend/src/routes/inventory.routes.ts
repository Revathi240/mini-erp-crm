import { verifyToken } from "../middleware/auth.middleware";
import { Router } from "express";
import { getInventoryData } from "../controllers/inventory.controller";

const router = Router();

router.get("/", verifyToken, getInventoryData);

export default router;