import { Request, Response } from "express";
import { getInventory } from "../services/inventory.service";

export const getInventoryData = async (
    req: Request,
    res: Response
) => {
    try {
        const inventory = await getInventory();
        res.json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};