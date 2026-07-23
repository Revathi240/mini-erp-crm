import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

// Register Controller
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await registerUser({
            name,
            email,
            password,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const data = await loginUser({
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: data.token,
            user: data.user,
        });
    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};