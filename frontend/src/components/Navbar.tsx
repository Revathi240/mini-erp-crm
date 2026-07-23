import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        height: "70px",
        background: "#2563eb",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <h2 style={{ margin: 0 }}>
        Mini ERP CRM
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <span>
          👤 {user?.name || "Admin"}
        </span>

        <button
          onClick={handleLogout}
          style={{
            background: "white",
            color: "#2563eb",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;