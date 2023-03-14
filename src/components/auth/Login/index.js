import React, { useState } from "react";
import { login } from "../../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../Layout/AuthLayout";
import ErrorMessage from "../../Error";
import isEmailValid from "../validators/emailValidator";
import isPasswordValid from "../validators/passwordValidator";
import { PASSWORD_MIN_CHARACTERS, EMAIL_INVALID } from "../constants/login";
import "./../Auth.scss";

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

  const handleValidInput = (action, value) => {
    switch (action) {
      case "email": {
        setEmail(value);
        break;
      }
      case "password": {
        setPassword(value);
        break;
      }
      default: {
        console.log("Invalid value for validation type");
      }
    }

    setError(null);
    setDisabled(false);
  };

  const handleInvalidInput = (error) => {
    setError(error);
    setDisabled(true);
  };

  const onEmailChange = (e) => {
    const value = e.target.value;
    const validEmail = isEmailValid(value);
    if (validEmail) {
      handleValidInput("email", value);
      return;
    }
    handleInvalidInput(EMAIL_INVALID);
  };

  const onPasswordChange = (e) => {
    const value = e.target.value;
    const validPassword = isPasswordValid(value);
    if (validPassword) {
      handleValidInput("password", value);
      return;
    }
    handleInvalidInput(PASSWORD_MIN_CHARACTERS);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formHasError = error;
    const isFormValid = !formHasError || formHasError === "";
    console.log(isFormValid);
    if (isFormValid) {
      dispatch(login({ email, password }, navigate));
    }
  };

  const message = isVerified !== null ? "" : "Email not verified";

  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className="form-auth">
        <h3 className="form-heading">Ulogiraj se!</h3>
        <input
          onChange={onEmailChange}
          required
          type="email"
          placeholder="Email"
        />
        <input
          onChange={onPasswordChange}
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
