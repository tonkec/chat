import React, { useState } from 'react';
import { login } from '../../../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import './../Auth.scss';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isVerified = useSelector((state) => {
    return state.authReducer.isVerified;
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, navigate));
  };

  const message = isVerified !== false ? '' : 'Email not verified';

  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className="form-auth">
        <h3 className="form-heading">Ulogiraj se!</h3>
        <input
          onChange={(e) => setEmail(e.target.value)}
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
      <div className="links-auth">
        {message && <p>{message}</p>}
        <Link to="/register">Registriraj se</Link> {'  '}
        <Link to="/forgot-password">Zaboravljena lozinka?</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
