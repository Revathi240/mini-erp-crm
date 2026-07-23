import pool from "../config/db";

export const getInventory = async () => {
    const result = await pool.query(`
        SELECT
            id,
            name,
            sku,
            category,
            stock,
            min_stock,
            warehouse,
            CASE
                WHEN stock <= min_stock THEN 'Low Stock'
                ELSE 'In Stock'
            END AS status
        FROM products
        ORDER BY id
    `);

    return result.rows;
};