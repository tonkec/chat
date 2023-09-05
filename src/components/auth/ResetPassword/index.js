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
import { PasswordChangeSchema } from '../../validations/profileValidation';
import { Message } from 'primereact/message';
import {Formik, useFormik} from 'formik';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flashMessageContext = useContext(FlashMessageContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm} = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: ''


    },
    validationSchema: PasswordChangeSchema,
    onSubmit: async(values, {resetForm}) => {
      const e = window.event;
      e.preventDefault();
      const hasToken = token !== null && token.trim() !== '';
      const message = !hasToken && WRONG_TOKEN;
      const password = values.password
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
  

    }
  });

  return (
    <AuthLayout>
      {process.env.NODE_ENV === 'test' && (
        <p data-testid="params">
          {email}
          {token}
        </p>
      )}
      <form onSubmit={handleSubmit} className="form-auth">
        <h3 className="form-heading">Promjena lozinke </h3>
        <InputText
          type="password"
          placeholder="Tvoja nova lozinka"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          required
          data-testid="password"
          id='password'
        />
          {errors.password && touched.password && <Message severity='error' text={errors.password} style={{width: '100%'}}/>}

        <InputText
          type="password"
          placeholder="Ponovi svoju novu lozinku"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.passwordConfirmation}
          required
          data-testid="confirmationPassword"
          id='passwordConfirmation'
        />
      {errors.passwordConfirmation && touched.passwordConfirmation && <Message severity='error' text={errors.passwordConfirmation} style={{width: '100%'}}/>}

        <Button
          style={{ width: '100%' }}
          label="Promijeni lozinku"
          
        />
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
