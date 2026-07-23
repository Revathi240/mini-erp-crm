import { Request, Response } from "express";
import {
    getAllCustomers,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} from "../services/customer.service";

export const getCustomers = async (
    req: Request,
    res: Response
) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const addCustomer = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            name,
            email,
            phone,
            address
        } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and Email are required"
            });
        }

        const customer = await createCustomer(
            name,
            email,
            phone,
            address
        );

        res.status(201).json(customer);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

export const getCustomer = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        const customer = await getCustomerById(id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json(customer);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

export const editCustomer = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        const {
            name,
            email,
            phone,
            address
        } = req.body;

        const customer = await updateCustomer(
            id,
            name,
            email,
            phone,
            address
        );

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json(customer);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

export const removeCustomer = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        const customer = await deleteCustomer(id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json(customer);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};