import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Products", path: "/products", icon: "📦" },
    { name: "Customers", path: "/customers", icon: "👥" },
    { name: "Inventory", path: "/inventory", icon: "🏬" },
    { name: "Sales", path: "/sales", icon: "🧾" },
  ];

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        ERP Menu
      </h2>

      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 15px",
            marginBottom: "10px",
            borderRadius: "8px",
            textDecoration: "none",
            color: "white",
            background:
              location.pathname === item.path
                ? "#2563eb"
                : "transparent",
            fontWeight:
              location.pathname === item.path
                ? "bold"
                : "normal",
            transition: "0.3s",
          }}
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;