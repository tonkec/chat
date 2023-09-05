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
import './../Auth.scss';
import { useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {MailVerificationSchema} from '../../validations/profileValidation'
import {Formik, useFormik} from 'formik';
import { Message } from 'primereact/message';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const flashMessageContext = useContext(FlashMessageContext);
  const isVerified = useSelector((state) => {
    return state.authReducer.isVerified;
  });

 


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

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm} = useFormik({
    initialValues: {
      mail: '',
      password: ''
    },
    validationSchema: MailVerificationSchema,
    onSubmit: async(values, {resetForm}) => {
      const e = window.event;
      e.preventDefault();
      const email = values.mail
      const password = values.password
      try {
        await dispatch(login({ email, password}));
        navigate('/');
  
        flashMessageContext.success(SUCCESSFUL_LOGIN);
      } catch (e) {
        if (e.response.status === 401) {
          flashMessageContext.error(INVALID_CREDENTIALS);
        } else {
          flashMessageContext.error(SOMETHING_WENT_WRONG);
        }
      }
      


    }
  });

  return (
    <AuthLayout>
      {process.env.NODE_ENV === 'test' && (
        <p data-testid="location-display">{location.pathname}</p>
      )}
      <form onSubmit={handleSubmit} className="form-auth">
        <h3 className="form-heading">Ulogiraj se!</h3>
        <InputText
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mail}
          required
          type="email"
          placeholder="Email"
          className="p-inputtext-lg"
          id='mail'
          style={errors.mail && touched.mail ? {backgroundColor: '#FFCCCC', width: '100%', marginBottom: '0.1vw'}  : {backgroundColor: '#ffffff', width: '100%', marginBottom: 15 }}
        />
        {errors.mail && touched.mail && <Message severity='error' text={errors.mail} style={{width: '100%', backgroundColor: '#ffffff', marginBottom: '0.5vw'}} />}
        <InputText
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          required
          type="password"
          placeholder="Lozinka"
          className="p-inputtext-lg"
          id='password'
          style={errors.password && touched.password ? {backgroundColor: '#FFCCCC', width: '100%', marginBottom: '0.1vw'}  : {backgroundColor: '#ffffff', width: '100%', marginBottom: 15 }}
        />
    {errors.password && touched.password && <Message severity='error' text={errors.password} style={{width: '100%', backgroundColor: '#ffffff', marginBottom: '0.5vw'}}/>}
        <Button style={{ width: '100%' }} label="Login" type='submit'/>
      </form>

      <div className="links-auth">
        <Link to="/register">Registriraj se</Link> {'  '}
        <Link to="/forgot-password">Zaboravljena lozinka?</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
