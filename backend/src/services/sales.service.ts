import pool from "../config/db";

export const getAllSales = async () => {
  const result = await pool.query(`
    SELECT
      sc.id,
      sc.challan_number,
      c.name AS customer_name,
      sc.challan_date,
      sc.status,
      COALESCE(SUM(ci.total), 0) AS total_amount
    FROM sales_challan sc
    JOIN customers c
      ON sc.customer_id = c.id
    LEFT JOIN challan_items ci
      ON sc.id = ci.challan_id
    GROUP BY
      sc.id,
      sc.challan_number,
      c.name,
      sc.challan_date,
      sc.status
    ORDER BY sc.id DESC;
  `);

  return result.rows;
};

interface ChallanItem {
  product_id: number;
  quantity: number;
  price: number;
}

interface SalesData {
  customer_id: number;
  status: string;
  items: ChallanItem[];
}

export const createSales = async (data: SalesData) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Generate Challan Number
    const challanResult = await client.query(
      "SELECT COUNT(*) FROM sales_challan"
    );

    const count = Number(challanResult.rows[0].count) + 1;
    const challanNumber = `CH-${String(count).padStart(6, "0")}`;

    // Insert into sales_challan
    const salesResult = await client.query(
      `
      INSERT INTO sales_challan
      (challan_number, customer_id, status)
      VALUES ($1,$2,$3)
      RETURNING id
      `,
      [challanNumber, data.customer_id, data.status]
    );

    const challanId = salesResult.rows[0].id;

    // Insert each item
    for (const item of data.items) {

      // Check available stock
      const stockResult = await client.query(
        `
        SELECT stock
        FROM products
        WHERE id=$1
        `,
        [item.product_id]
      );

      const stock = stockResult.rows[0].stock;

      if (stock < item.quantity) {
        throw new Error(
          `Insufficient stock for Product ID ${item.product_id}`
        );
      }

      // Save challan item
      await client.query(
        `
        INSERT INTO challan_items
        (challan_id, product_id, quantity, price)
        VALUES ($1,$2,$3,$4)
        `,
        [
          challanId,
          item.product_id,
          item.quantity,
          item.price,
        ]
      );

      // Deduct stock
      await client.query(
        `
        UPDATE products
        SET stock = stock - $1
        WHERE id=$2
        `,
        [
          item.quantity,
          item.product_id,
        ]
      );
    }

    await client.query("COMMIT");

    return {
      message: "Sales Challan Created Successfully",
      challan_number: challanNumber,
    };

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }
};