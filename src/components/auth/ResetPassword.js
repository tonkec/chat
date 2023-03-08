import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../store/actions/auth';
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
    <>
      <h1>Promjena lozinke za </h1>
      <form>
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
    </>
  );
};

export default ResetPassword;
