import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/inventory.css";
import "../styles/table.css";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  min_stock: number;
  warehouse: string;
  status: string;
}

function InventoryTable() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/inventory")
      .then((res) => {
        setInventory(res.data);
      })
      .catch((err) => {
        console.error("Error fetching inventory:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Loading Inventory...
      </div>
    );
  }

  return (
    <table border={1} cellPadding={10}>
      <thead>
        <tr>
          <th>Product</th>
          <th>Current Stock</th>
          <th>Minimum Stock</th>
          <th>Warehouse</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {inventory.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
              No Inventory Found
            </td>
          </tr>
        ) : (
          inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.min_stock}</td>
              <td>{item.warehouse}</td>
              <td>
                <span
                  className={
                    item.status === "In Stock"
                      ? "badge badge-success"
                      : "badge badge-warning"
                  }
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default InventoryTable;