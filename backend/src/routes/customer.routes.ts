import { verifyToken } from "../middleware/auth.middleware";
import { Router } from "express";
import {
    getCustomers,
    addCustomer,
    getCustomer,
    editCustomer,
    removeCustomer
} from "../controllers/customer.controller";

const router = Router();

router.get("/", verifyToken,getCustomers);
router.get("/:id", verifyToken,getCustomer);
router.post("/", verifyToken,addCustomer);
router.put("/:id",verifyToken, editCustomer);
router.delete("/:id", verifyToken,removeCustomer);

export default router;