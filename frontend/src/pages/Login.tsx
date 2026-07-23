import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import toast from "react-hot-toast";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await login({
        email,
        password,
      });

      toast.success("Login Successful");

      navigate("/");

    } catch {

      toast.error("Invalid Email or Password");

    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="login-title">
          Mini ERP CRM
        </h1>

        <p className="login-subtitle">
          Welcome Back
        </p>

        <form onSubmit={handleSubmit}>

          <input
            className="login-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="login-button"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;