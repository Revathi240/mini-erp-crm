import { verifyToken } from "../middleware/auth.middleware";
import { Router } from "express";
import {
    getProducts,
    addProduct,
    getProduct,
    editProduct,
    removeProduct
} from "../controllers/product.controller";



const router = Router();

// GET all products
router.get("/",verifyToken, getProducts);

//GET product by id
router.get("/:id",verifyToken, getProduct);

// POST new product
router.post("/", verifyToken,addProduct);

//UPDATE product
router.put("/:id",verifyToken, editProduct);

//DELETE product

router.delete("/:id",verifyToken, removeProduct);




export default router;