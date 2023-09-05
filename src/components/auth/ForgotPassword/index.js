import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../store/actions/auth';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import { SOMETHING_WENT_WRONG } from '../constants';
import FlashMessageContext from '../../../context/FlashMessage/flashMessageContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './../Auth.scss';
import { ForgotPasswordSchema } from '../../validations/profileValidation';
import { Formik, useFormik } from 'formik';
import { Message } from 'primereact/message';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const flashMessageContext = useContext(FlashMessageContext);
 
  const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm} = useFormik({
    initialValues: {
      mail: ''


    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, {resetForm}) => {
      const e = window.event;
      e.preventDefault();
    const email = values.mail
    try {
      dispatch(forgotPassword(email, navigate));
    } catch (e) {
      flashMessageContext.error(SOMETHING_WENT_WRONG);
    }
    
  

    }
  });

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="form-auth" >
        <h3 className="form-heading">Zaboravljena lozinka</h3>
        <InputText
          type="email"
          placeholder="Tvoj email"
          required
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mail}
          data-testid="email"
          id='mail'
        />
      {errors.mail && touched.mail && <Message severity='error' text={errors.mail} style={{width: '100%'}}/>}

        <Button
          style={{ width: '100%' }}
          label="Zatraži novu lozinku"
          type='submit'
        />
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
