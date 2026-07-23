import { verifyToken } from "../middleware/auth.middleware";
import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller";

const router = Router();

router.get("/", verifyToken,getDashboard);

export default router;