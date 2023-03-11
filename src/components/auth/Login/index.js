import React, { useState } from "react";
import { login } from "../../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../Layout/AuthLayout";
import "./../Auth.scss";
import isEmailValid from "../IsEmailValid";
import ErrorMessage from "../ErrorMessage";
import isPasswordValid from "../IsPasswordValid";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const isVerified = useSelector((state) => {
    return state.authReducer.isVerified;
  });

  const onEmailChange = (e) => {
    const validEmail = isEmailValid(e.target.value);
    if (validEmail) {
      setEmail(e.target.value);
    } else {
      setError("Email is invalid");
      setDisabled(true);
    }
  };
  const onPasswordChange = (e) => {
    const validPassword = isPasswordValid(e.target.value);
    if (validPassword) {
      setPassword(e.target.value);
    } else {
      setError("Password must contain at least 6 characters");
      setDisabled(true);
    }
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
          onChange={onEmailChange}
          value={email}
          required
          type="email"
          placeholder="Email"
        />
        <input
          // onChange={(e) => setPassword(e.target.value)}
          onChange={onPasswordChange}
          value={password}
          required
          type="password"
          placeholder="Lozinka"
        />
        <button disabled={isDisabled}>Login</button>
      </form>

      <ErrorMessage error={error} />
      <div className="links-auth">
        {message && <p>{message}</p>}
        <Link to="/register">Registriraj se</Link> {"  "}
        <Link to="/forgot-password">Zaboravljena lozinka?</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
