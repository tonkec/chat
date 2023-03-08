import React, { useState, useEffect } from 'react';
import { login } from '../../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const user = useSelector((state) => {
    return state.authReducer.isVerified;
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, navigate));
    if (user) {
      setMessage('');
    } else {
      setMessage('Not verified');
    }
  };

  useEffect(() => {}, [user]);

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
            {message && <p>{message}</p>}
            <p>
              Don't have account? <Link to="/register">Register</Link>
            </p>

            <p>
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
