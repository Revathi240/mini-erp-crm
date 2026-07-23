import { useEffect, useState } from "react";

import Card from "../components/Card";
import DashboardCard from "../components/DashboardCard";
import {
    getDashboardStats,
    type DashboardStats
} from "../services/dashboard.service";

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DashboardStats>({
        totalProducts: 0,
        totalCustomers: 0,
        lowStock: 0,
        totalSales: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

   const loadDashboard = async () => {
    try {
        setLoading(true);

        const data = await getDashboardStats();

        setStats(data);

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }
};
    if (loading) {
    return <h2>Loading Dashboard...</h2>;
}

    return (
  <>
    <h1
      style={{
        marginBottom: "20px",
        color: "#1e293b",
      }}
    >
      Dashboard
    </h1>

    <Card title="Dashboard Summary">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <DashboardCard
          title="📦 Total Products"
          value={stats.totalProducts}
        />

        <DashboardCard
          title="👥 Total Customers"
          value={stats.totalCustomers}
        />

        <DashboardCard
          title="⚠️ Low Stock"
          value={stats.lowStock}
        />

        <DashboardCard
          title="💰 Total Sales"
          value={`₹${stats.totalSales}`}
        />
      </div>
    </Card>
  </>
);
}

export default Dashboard;