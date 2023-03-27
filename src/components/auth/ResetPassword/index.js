import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPassword,
  getResetPasswordToken,
} from '../../../store/actions/auth';
import { PASSWORD_MIN_CHARACTERS, DIFFERENT_PASSWORDS } from '../constants';
import AuthLayout from '../../Layout/AuthLayout';
import isPasswordValid from '../validators/passwordValidator';
import './../Auth.scss';
import FlashMessageContext from '../../../context/FlashMessage/flashMessageContext';
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const flashMessageContext = useContext(FlashMessageContext);
  const [submitted, setSubmitted] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleValidInput = (action, value) => {
    switch (action) {
      case 'password': {
        setPassword(value);
        break;
      }
      default: {
        console.log('Invalid value for validation type');
      }
    }

    flashMessageContext.close();
    setError(null);
    setDisabled(false);
  };

  const handleInvalidInput = (error) => {
    flashMessageContext.error(error);
    setError(error);
    setDisabled(true);
  };

  const onPasswordChange = (e) => {
    const value = e.target.value;
    const validPassword = isPasswordValid(value);
    if (validPassword) {
      handleValidInput('password', value);
      return;
    }
    handleInvalidInput(PASSWORD_MIN_CHARACTERS);
  };

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
      flashMessageContext.error(DIFFERENT_PASSWORDS);
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
          // onChange={(e) => setPassword(e.target.value)}
          onChange={onPasswordChange}
        />
        <input
          type="password"
          placeholder="Ponovi svoju novu lozinku"
          value={passwordConfirmation || ''}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button onClick={onHandleSubmit} disabled={isDisabled}>
          Promijeni lozinku
        </button>
      </form>
      <div className="links-auth">{message && message}</div>
    </AuthLayout>
  );
};

export default ResetPassword;
