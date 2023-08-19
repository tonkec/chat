import React, { useState, useEffect, useContext } from 'react';
import { login } from '../../../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import {
  EMAIL_NOT_VERIFIED,
  INVALID_CREDENTIALS,
  SUCCESSFUL_LOGIN,
  PASSWORD_MIN_CHARACTERS,
  EMAIL_INVALID,
  SOMETHING_WENT_WRONG,
} from '../constants';
import FlashMessageContext from '../../../context/FlashMessage/flashMessageContext';
import isEmailValid from '../validators/emailValidator';
import isPasswordValid from '../validators/passwordValidator';
import './../Auth.scss';
import { useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const flashMessageContext = useContext(FlashMessageContext);
  const isVerified = useSelector((state) => {
    return state.authReducer.isVerified;
  });

  const handleValidInput = (action, value) => {
    switch (action) {
      case 'email': {
        setEmail(value);
        break;
      }
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

  const onEmailChange = (e) => {
    const value = e.target.value;
    const validEmail = isEmailValid(value);
    if (validEmail) {
      handleValidInput('email', value);
      return;
    }
    handleInvalidInput(EMAIL_INVALID);
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

  const submitData = async () => {
    try {
      await dispatch(login({ email, password }));
      navigate('/');

      flashMessageContext.success(SUCCESSFUL_LOGIN);
    } catch (e) {
      if (e.response.status === 401) {
        flashMessageContext.error(INVALID_CREDENTIALS);
      } else {
        flashMessageContext.error(SOMETHING_WENT_WRONG);
      }
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formHasError = error;
    const isFormValid = !formHasError || formHasError === '';
    if (isFormValid) {
      submitData();
    }
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
  }, []);

  return (
    <AuthLayout>
      {process.env.NODE_ENV === 'test' && (
        <p data-testid="location-display">{location.pathname}</p>
      )}
      <form onSubmit={onFormSubmit} className="form-auth">
        <h3 className="form-heading">Ulogiraj se!</h3>
        <InputText
          onChange={onEmailChange}
          required
          type="email"
          placeholder="Email"
          className="p-inputtext-lg"
        />

        <InputText
          onChange={onPasswordChange}
          required
          type="password"
          placeholder="Lozinka"
          className="p-inputtext-lg"
        />

        <Button style={{ width: '100%' }} label="Login" disabled={isDisabled} />
      </form>

      <div className="links-auth">
        <Link to="/register">Registriraj se</Link> {'  '}
        <Link to="/forgot-password">Zaboravljena lozinka?</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
