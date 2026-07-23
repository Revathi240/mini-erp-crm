import express from "express";
import cors from "cors";

import productRoutes from "./routes/product.routes";
import customerRoutes from "./routes/customer.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import inventoryRoutes from "./routes/inventory.routes";
import salesRoutes from "./routes/sales.routes";
import authRoutes from "./routes/auth.routes";

import { logger } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// CORS Middleware
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

// Built-in Middleware
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// Root Route
app.get("/", (req, res) => {
    res.send("Mini ERP CRM Backend is Running 🚀");
});

// Product Routes
app.use("/products", productRoutes);

//Customer Routes
app.use("/customers", customerRoutes);

//Dashboard Route
app.use("/dashboard", dashboardRoutes);

//inventory Rputes
app.use("/inventory", inventoryRoutes);

//Sales Routes
app.use("/sales", salesRoutes);

//Auth routes
app.use("/auth", authRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;