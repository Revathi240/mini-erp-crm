import pool from "../config/db";

export const getDashboardStats = async () => {

    const totalProducts = await pool.query(
        "SELECT COUNT(*) FROM products"
    );

    const totalCustomers = await pool.query(
        "SELECT COUNT(*) FROM customers"
    );

    const lowStock = await pool.query(
        "SELECT COUNT(*) FROM products WHERE stock <= min_stock"
    );

    const totalSales = await pool.query(
        "SELECT COALESCE(SUM(price * stock),0) AS total FROM products"
    );

    return {
        totalProducts: Number(totalProducts.rows[0].count),
        totalCustomers: Number(totalCustomers.rows[0].count),
        lowStock: Number(lowStock.rows[0].count),
        totalSales: Number(totalSales.rows[0].total)
    };

};