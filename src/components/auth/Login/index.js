import React, { useState, useEffect, useContext } from 'react';
import { login } from '../../../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import {
  EMAIL_NOT_VERIFIED,
  INVALID_CREDENTIALS,
  SUCCESSFUL_LOGIN,
} from '../constants';
import FlashMessageContext from '../../../context/FlashMessage/flashMessageContext';

import './../Auth.scss';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const flashMessageContext = useContext(FlashMessageContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isVerified = useSelector((state) => {
    return state.authReducer.isVerified;
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (result.status === 404) {
      flashMessageContext.error(INVALID_CREDENTIALS);
      return;
    }

    navigate('/');
    flashMessageContext.success(SUCCESSFUL_LOGIN);
  };

  const isUserVerified = () => {
    if (isVerified === 'initial') {
      return;
    }

    if (isVerified) {
      return;
    }

    if (!isVerified) {
      flashMessageContext.error(EMAIL_NOT_VERIFIED);
      return;
    }
  };

  useEffect(() => {
    isUserVerified();
  });

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
        <Link to="/register">Registriraj se</Link> {'  '}
        <Link to="/forgot-password">Zaboravljena lozinka?</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
