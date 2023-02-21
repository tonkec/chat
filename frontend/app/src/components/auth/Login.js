import React, { useState } from "react";
import axios from "axios";
import AuthService from "../../services/authService";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login({ email, password });
  };
  return (
    <div id="auth-container">
      <div id="auth-card">
        <div>
          <div id="image-section"></div>
          <div id="form-section">
            <h2>Welcome back</h2>
            <form onSubmit={onSubmit}>
              <div className="input-field">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  type="email"
                  placeholder="email"
                />
              </div>

              <div className="input-field">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  type="password"
                  placeholder="password"
                />
              </div>

              <button>Login</button>
            </form>

            <p> Don't have account? Register</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
