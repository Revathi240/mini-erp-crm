import pool from "../config/db";

export const getAllCustomers = async () => {
    const result = await pool.query(
        `SELECT * FROM customers ORDER BY id`
    );
    return result.rows;
};

export const createCustomer = async (
    name: string,
    email: string,
    phone: string,
    address: string
) => {
    const result = await pool.query(
        `INSERT INTO customers(name,email,phone,address)
         VALUES($1,$2,$3,$4)
         RETURNING *`,
        [name, email, phone, address]
    );

    return result.rows[0];
};

export const getCustomerById = async (id: number) => {
    const result = await pool.query(
        `SELECT * FROM customers WHERE id=$1`,
        [id]
    );

    return result.rows[0];
};

export const updateCustomer = async (
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string
) => {
    const result = await pool.query(
        `UPDATE customers
         SET
            name=$1,
            email=$2,
            phone=$3,
            address=$4
         WHERE id=$5
         RETURNING *`,
        [name, email, phone, address, id]
    );

    return result.rows[0];
};

export const deleteCustomer = async (id: number) => {
    const result = await pool.query(
        `DELETE FROM customers
         WHERE id=$1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};