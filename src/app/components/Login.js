import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = ({ setLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("https://tankwaaddis.onrender.com/apiuser/login", {
        username,
        password
      });
  console.log(response)
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        console.log(true)
        
        setLoginSuccess(true);
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <div className="form-header">
          <div className="titles">
            <div className="title-login">Login</div>
          </div>
        </div>
        {error && <div className="error-message">{error.message}</div>}
        <form onSubmit={handleLoginSubmit} className="login-form" autoComplete="off">
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="label">Username</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">Password</label>
          </div>
          <div className="input-box">
            <button 
              className="btn-submit" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;