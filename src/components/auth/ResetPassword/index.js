import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPassword,
  getResetPasswordToken,
} from '../../../store/actions/auth';
import AuthLayout from '../../Layout/AuthLayout';

import './../Auth.scss';
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const hasToken = useSelector((state) => {
    return state.authReducer.resetPasswordToken;
  });
  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      return;
    }

    if (password.trim() === '') {
      return;
    }

    if (password !== passwordConfirmation) {
      // show error message
      return;
    }

    dispatch(getResetPasswordToken(email, token));
    setSubmitted(true);
  };
  const message =
    typeof hasToken === 'undefined' && submitted
      ? 'Something is wrong with the token'
      : '';

  useEffect(() => {
    if (submitted) {
      if (hasToken) {
        dispatch(resetPassword(password, email));
        navigate('/login');
      }
    }
  }, [hasToken, dispatch, email, password, submitted, navigate]);

  return (
    <AuthLayout>
      <form className="form-auth">
        <h3 className="form-heading">Promjena lozinke </h3>
        <input
          type="password"
          placeholder="Tvoja nova lozinka"
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ponovi svoju novu lozinku"
          value={passwordConfirmation || ''}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button onClick={onHandleSubmit}>Promijeni lozinku</button>
      </form>
      <div className="links-auth">{message && message}</div>
    </AuthLayout>
  );
};

export default ResetPassword;
