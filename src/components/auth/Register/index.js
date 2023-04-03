import React, { useContext, useState } from 'react';
import { register } from '../../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import isEmailValid from '../validators/emailValidator';
import isPasswordValid from '../validators/passwordValidator';
import {
  EMAIL_INVALID,
  NAME_EMPTY,
  LAST_NAME_EMPTY,
  PASSWORD_MIN_CHARACTERS,
  SOMETHING_WENT_WRONG,
} from '../constants';
import isNameValid from '../validators/nameValidator';
import FlashMessageContext from '../../../context/FlashMessage/flashMessageContext';
import './../Auth.scss';

const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const flashMessageContext = useContext(FlashMessageContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setDisabled] = useState(true);

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
      case 'firstName': {
        setFirstName(value);
        break;
      }
      case 'lastName': {
        setLastName(value);
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

  const onNameChange = (e) => {
    const value = e.target.value;
    const validName = isNameValid(value);
    if (validName) {
      handleValidInput('firstName', value);
      return;
    }
    handleInvalidInput(NAME_EMPTY);
  };

  const onLastNameChange = (e) => {
    const value = e.target.value;
    const validLastName = isNameValid(value);
    if (validLastName) {
      handleValidInput('lastName', value);
      return;
    }
    handleInvalidInput(LAST_NAME_EMPTY);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const errorIsEmpty = error === null && !isDisabled;
    if (errorIsEmpty) {
      try {
        await dispatch(register({ email, password, firstName, lastName }));
        navigate('/login');
      } catch (e) {
        flashMessageContext.error(SOMETHING_WENT_WRONG);
      }
      return;
    }
  };
  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className="form-auth">
        <h2 className="form-heading">Pridruži se</h2>
        <input
          onChange={onNameChange}
          required
          type="text"
          placeholder="Tvoje ime"
          data-testid="name"
        />

        <input
          onChange={onLastNameChange}
          required
          type="text"
          placeholder="Tvoje prezime"
          data-testid="lastName"
        />

        <input
          onChange={onEmailChange}
          onKeyDown={onEmailChange}
          required
          type="email"
          placeholder="Tvoj mail"
          data-testid="email"
        />

        <input
          onChange={onPasswordChange}
          required
          type="password"
          placeholder="Tvoja lozinka"
          data-testid="password"
        />

        <button disabled={isDisabled}>Pridruži se</button>
      </form>

      <div className="links-auth">
        <Link to="/login">Ulogiraj se</Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
