import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/sales.css";
import "../styles/table.css";

import toast from "react-hot-toast";

interface Sale {
  id: number;
  challan_number: string;
  customer_name: string;
  challan_date: string;
  status: string;
  total_amount: number;
}

function SalesTable() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

useEffect(() => {
  api.get("/sales")
    .then((res) => {
      console.log("Sales API Response:", res.data); // <-- ADD THIS LINE
      setSales(res.data);
      setLoading(false);
    })

    .catch((err) => {
      console.error("Error fetching sales:", err);
      setLoading(false);
    });
}, []);

const filteredSales = sales.filter((sale) => {
  const matchesSearch =
  (sale.challan_number ?? "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  (sale.customer_name ?? "")
    .toLowerCase()
    .includes(search.toLowerCase());
  const matchesStatus =
    statusFilter === "All" || sale.status === statusFilter;

  return matchesSearch && matchesStatus;
});

if (loading) {

    return (

        <div
            style={{
                textAlign:"center",
                padding:"40px",
                fontSize:"20px",
                fontWeight:"bold"
            }}
        >
            Loading Sales...
        </div>

    );

}


  return (
    <div>

      <h2>Sales Challans</h2>

<div style={{ marginBottom: "20px" }}>
  <input
    type="text"
    placeholder="Search by Challan or Customer"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      padding: "8px",
      width: "250px",
      marginRight: "10px",
    }}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    style={{ padding: "8px" }}
  >
    <option value="All">All</option>
    <option value="Draft">Draft</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</div>

      <table border={1} cellPadding={10}>

        <thead>

          <tr>
            <th>Challan No</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>

        </thead>

        <tbody>

          {filteredSales.map((sale) => (

            <tr key={sale.id}>

              <td>{sale.challan_number}</td>

              <td>{sale.customer_name}</td>

              <td>{sale.challan_date}</td>

              <td>{sale.status}</td>

              <td>₹ {sale.total_amount}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default SalesTable;