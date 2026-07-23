import pool from "../config/db";

export const getAllProducts = async (
    name?: string,
    minPrice?: number,
    maxPrice?: number,
    page: number = 1,
    limit: number = 5
) => {

   let query = `
SELECT
    id,
    name,
    sku,
    category,
    price,
    stock,
    min_stock,
    warehouse
FROM products
WHERE 1=1
`;
    const values: any[] = [];
    const offset = (page - 1) * limit;

    if (name) {
        values.push(`%${name}%`);
        query += ` AND name ILIKE $${values.length}`;
    }

    if (minPrice !== undefined) {
        values.push(minPrice);
        query += ` AND price >= $${values.length}`;
    }

    if (maxPrice !== undefined) {
        values.push(maxPrice);
        query += ` AND price <= $${values.length}`;
    }

    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

    values.push(limit);
    values.push(offset);    

    console.log(query);
console.log(values);
    const result = await pool.query(query, values);
    console.log(result.rows);

    return result.rows;
};

//create product

export const createProduct = async (
    name: string,
    sku: string,
    category: string,
    price: number,
    stock: number,
    min_stock: number,
    warehouse: string
) => {

    const result = await pool.query(

        `
        INSERT INTO products
        (
            name,
            sku,
            category,
            price,
            stock,
            min_stock,
            warehouse
        )

        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7
        )

        RETURNING *;
        `,

        [
            name,
            sku,
            category,
            price,
            stock,
            min_stock,
            warehouse
        ]

    );

    return result.rows[0];

};

//get product by id

export const getProductById = async (id: number) => {

    const result = await pool.query(
        `SELECT * FROM products WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

//Get products


//Update product
export const updateProduct = async (
    id: number,
    name: string,
    sku: string,
    category: string,
    price: number,
    stock: number,
    min_stock: number,
    warehouse: string
) => {

    const result = await pool.query(

        `
        UPDATE products

        SET

            name = $1,
            sku = $2,
            category = $3,
            price = $4,
            stock = $5,
            min_stock = $6,
            warehouse = $7,
            updated_at = CURRENT_TIMESTAMP

        WHERE id = $8

        RETURNING *;
        `,

        [
            name,
            sku,
            category,
            price,
            stock,
            min_stock,
            warehouse,
            id
        ]

    );

    return result.rows[0];

};

//DELETE product
export const deleteProduct = async (id: number) => {

    const result = await pool.query(
        `
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];
};