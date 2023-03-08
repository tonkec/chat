import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../store/actions/auth';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, navigate));
  };
  return (
    <>
      <h1>Forgot password?</h1>
      <form>
        <input
          type="email"
          placeholder="Tvoj email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={onHandleSubmit}>Zatraži novu lozinku</button>
      </form>
    </>
  );
};

export default ForgotPassword;
