import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../../store/actions/auth';
import AuthLayout from '../../Layout/AuthLayout';

import './../Auth.scss';
const ResetPassword = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const email = searchParams.get('email');

    if (password !== passwordConfirmation) {
      // show error message
      return;
    }
    dispatch(resetPassword(password, email));
  };
  return (
    <AuthLayout>
      <form className="form-auth">
        <h3 className="form-heading">Promjena lozinke za </h3>
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
    </AuthLayout>
  );
};

export default ResetPassword;
