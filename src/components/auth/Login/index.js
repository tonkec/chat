import React, { useState } from "react";
import { login } from "../../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../Layout/AuthLayout";
import "./../Auth.scss";
import IsEmailValid from "../IsEmailValid";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isVerified = useSelector((state) => {
    return state.authReducer.isVerified;
  });

  const setAndCheckEmail = (e) => {
    if (!IsEmailValid(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, navigate));
  };

  const message = isVerified !== null ? "" : "Email not verified";

  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className="form-auth">
        <h3 className="form-heading">Ulogiraj se!</h3>
        <input
          // onChange={(e) => setEmail(e.target.value)}
          onChange={setAndCheckEmail}
          value={email}
          required
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          type="password"
          placeholder="Lozinka"
        />
        <button>Login</button>
      </form>
      {error && <h5 style={{ color: "red" }}>{error}</h5>}
      <div className="links-auth">
        {message && <p>{message}</p>}
        <Link to="/register">Registriraj se</Link> {"  "}
        <Link to="/forgot-password">Zaboravljena lozinka?</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
