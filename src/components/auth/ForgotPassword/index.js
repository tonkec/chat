import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../store/actions/auth';
import { useNavigate } from 'react-router-dom';
import './../Auth.scss';
import AuthLayout from '../../Layout/AuthLayout';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, navigate));
  };
  return (
    <AuthLayout>
      <form className="form-auth">
        <h3 className="form-heading">Tvoj email</h3>
        <input
          type="email"
          placeholder="Tvoj email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={onHandleSubmit}>Zatraži novu lozinku</button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
