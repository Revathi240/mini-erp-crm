import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";

import "../styles/layout.css";


function Layout() {

  const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};

  return (
    <div className="layout-body">
  <Sidebar />

  <main className="layout-content">

    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>

    <Outlet />
  </main>
</div>
  );
}

export default Layout;