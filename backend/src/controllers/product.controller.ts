import { Request, Response } from "express";
import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from "../services/product.service";

// GET /products
export const getProducts = async (
    req: Request,
    res: Response
) => {
    try {

        const name = req.query.name as string | undefined;

        const minPrice = req.query.minPrice
            ? Number(req.query.minPrice)
            : undefined;

        const maxPrice = req.query.maxPrice
            ? Number(req.query.maxPrice)
            : undefined;

        const page = req.query.page
            ? Number(req.query.page)
            : 1;

        const limit = req.query.limit
            ? Number(req.query.limit)
            : 100;

        const products = await getAllProducts(
            name,
            minPrice,
            maxPrice,
            page,
            limit
        );

        res.status(200).json(products);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};
// POST /products
export const addProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const {
    name,
    sku,
    category,
    price,
    stock,
    min_stock,
    warehouse
} = req.body;

        // Product name validation
        if (!name || name.trim() === "") {
            return res.status(400).json({
                message: "Product name is required"
            });
        }

        // Price validation
        if (price === undefined || isNaN(price)) {
            return res.status(400).json({
                message: "Price must be a valid number"
            });
        }

        if (price < 0) {
            return res.status(400).json({
                message: "Price cannot be negative"
            });
        }

        // Stock validation
        if (stock === undefined || isNaN(stock)) {
            return res.status(400).json({
                message: "Stock must be a valid number"
            });
        }

        if (stock < 0) {
            return res.status(400).json({
                message: "Stock cannot be negative"
            });
        }

        const product = await createProduct(
    name,
    sku,
    category,
    price,
    stock,
    min_stock,
    warehouse
);

        res.status(201).json({
            message: "Product Created Successfully",
            product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//GET product by id 
export const getProduct = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        //validation for product id
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

//Edit or update product
export const editProduct = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        //validation for product id
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

        const {
    name,
    sku,
    category,
    price,
    stock,
    min_stock,
    warehouse
} = req.body;

        // Product name validation
        if (!name || name.trim() === "") {
            return res.status(400).json({
                message: "Product name is required"
            });
        }

        // SKU validation
if (!sku || sku.trim() === "") {
    return res.status(400).json({
        message: "SKU is required"
    });
}

// Category validation
if (!category || category.trim() === "") {
    return res.status(400).json({
        message: "Category is required"
    });
}

// Minimum Stock validation
if (min_stock === undefined || isNaN(min_stock)) {
    return res.status(400).json({
        message: "Minimum stock is required"
    });
}

// Warehouse validation
if (!warehouse || warehouse.trim() === "") {
    return res.status(400).json({
        message: "Warehouse is required"
    });
}


        // Price validation
        if (price === undefined || isNaN(price)) {
            return res.status(400).json({
                message: "Price must be a valid number"
            });
        }

        if (price < 0) {
            return res.status(400).json({
                message: "Price cannot be negative"
            });
        }

        // Stock validation
        if (stock === undefined || isNaN(stock)) {
            return res.status(400).json({
                message: "Stock must be a valid number"
            });
        }

        if (stock < 0) {
            return res.status(400).json({
                message: "Stock cannot be negative"
            });
        }
        
        const product = await updateProduct(
    id,
    name,
    sku,
    category,
    price,
    stock,
    min_stock,
    warehouse
);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product Updated Successfully",
            product
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

//DELETE product or Remove product

export const removeProduct = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);
        //validation for product id
        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

        const product = await deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product Deleted Successfully",
            product
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};