import React, { useState } from "react";
import { register } from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("female");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register({ email, password, firstName, lastName, gender }, navigate)
    );
  };
  return (
    <div id="auth-container">
      <div id="auth-card">
        <div>
          <div id="image-section"></div>
          <div id="form-section">
            <h2>Welcome</h2>
            <form onSubmit={onSubmit}>
              <div className="input-field">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                  type="text"
                  placeholder="f name"
                />
              </div>

              <div className="input-field">
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                  type="text"
                  placeholder="l name"
                />
              </div>

              <div className="input-field">
                <select onChange={(e) => setGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

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

              <button>Register</button>
            </form>

            <p> Already have an account? Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
