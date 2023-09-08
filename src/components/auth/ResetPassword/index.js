import { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  resetPassword,
  getResetPasswordToken,
} from '../../../store/actions/auth';
import {
  PASSWORD_MIN_CHARACTERS,
  PASSWORDS_MISMATCH,
  WRONG_TOKEN,
  SOMETHING_WENT_WRONG,
} from '../constants';
import AuthLayout from '../../Layout/AuthLayout';
import isPasswordValid from '../validators/passwordValidator';
import FlashMessageContext from '../../../context/FlashMessage/flashMessageContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './../Auth.scss';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const flashMessageContext = useContext(FlashMessageContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleValidInput = (action, value) => {
    switch (action) {
      case 'password': {
        setPassword(value);
        break;
      }
      case 'password confirmation': {
        setPasswordConfirmation(value);
        break;
      }
      default: {
        console.log('Invalid value for validation type');
      }
    }

    flashMessageContext.close();
    setDisabled(false);
  };

  const handleInvalidInput = error => {
    flashMessageContext.error(error);
    setDisabled(true);
  };

  const onPasswordChange = e => {
    const value = e.target.value;
    const validPassword = isPasswordValid(value);
    if (validPassword) {
      handleValidInput('password', value);
      return;
    }
    handleInvalidInput(PASSWORD_MIN_CHARACTERS);
  };

  const onConfirmationPasswordChange = e => {
    const value = e.target.value;
    const validPassword = isPasswordValid(value);
    if (value !== password) {
      handleInvalidInput(PASSWORDS_MISMATCH);
    }

    if (validPassword) {
      handleValidInput('password confirmation', value);
    } else {
      handleInvalidInput(PASSWORD_MIN_CHARACTERS);
    }
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    const hasToken = token !== null && token.trim() !== '';
    const message = !hasToken && WRONG_TOKEN;
    message && flashMessageContext.error(message);
    if (!token) {
      return;
    }

    try {
      dispatch(getResetPasswordToken(email, token));
      dispatch(resetPassword(password, email));
      navigate('/login');
    } catch (e) {
      flashMessageContext.error(SOMETHING_WENT_WRONG);
    }
  };

  return (
    <AuthLayout>
      {process.env.NODE_ENV === 'test' && (
        <p data-testid='params'>
          {email}
          {token}
        </p>
      )}
      <form className='form-auth'>
        <h3 className='form-heading'>Promjena lozinke </h3>
        <InputText
          type='password'
          placeholder='Tvoja nova lozinka'
          onChange={onPasswordChange}
          required
          data-testid='password'
        />

        <InputText
          type='password'
          placeholder='Ponovi svoju novu lozinku'
          onChange={onConfirmationPasswordChange}
          required
          data-testid='confirmationPassword'
        />

        <Button
          style={{ width: '100%' }}
          label='Promijeni lozinku'
          onClick={onHandleSubmit}
          disabled={isDisabled}
        />
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
