import { Request, Response } from "express";
import { getAllSales, createSales } from "../services/sales.service";

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({
      message: "Failed to fetch sales.",
    });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const sale = await createSales(req.body);

    res.status(201).json(sale);

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};