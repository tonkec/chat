import React, { useState, useEffect} from 'react';
import { login } from '../../../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import './../Auth.scss';
import { useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {MailVerificationSchema} from '../../validations/profileValidation'
import {useFormik} from 'formik';
import { Message } from 'primereact/message';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errStatus, setErrStatus] = useState({
    err: false,
    errText: '',
  });
 

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
      setErrStatus({
        err: true,
        errText: 'Molimo vas da prvo verifikujete email adresu!'
      });
      return;
    }
  };

  useEffect(() => {
    isUserVerified();
  }, []);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched} = useFormik({
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
  
      } catch (e) {
        if (e.response.status === 401) {
          setErrStatus({
            err: true,
            errText: 'Molim vas unesite podatke sa kojima je nalog vec registrovan!'
          });
          
        } else {
          setErrStatus({
            err: true,
            errText: 'Doslo je do greske na serveru!'
          });
        }
      }
      


    }
  });

  useEffect(() => setErrStatus({err: false, errText: ''}),[values.password, values.mail]);

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
        {errStatus.err && <Message severity='error' text={errStatus.errText} style={{width: '100%', backgroundColor: '#ffffff', marginBottom: '0.5vw'}}/>}
       
      </form>

      <div className="links-auth">
        <Link to="/register">Registriraj se</Link> {'  '}
        <Link to="/forgot-password">Zaboravljena lozinka?</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
