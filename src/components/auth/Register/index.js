import React, { useContext, useState, useEffect } from 'react';
import { register } from '../../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './../Auth.scss';
import { RegistrationSchema } from '../../validations/profileValidation';
import { Message } from 'primereact/message';
import {useFormik} from 'formik';

const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [errStatus, setErrStatus] = useState({
    err: false,
    errText: '',
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched} = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      mail: '',
      password: '',


    },
    validationSchema: RegistrationSchema,
    onSubmit: async(values) => {
      const e = window.event;
      e.preventDefault();
    const email = values.mail
    const password = values.password
    const firstName = values.name
    const lastName = values.lastName
      try {
        await dispatch(register({ email, password, firstName, lastName }));
        navigate('/login');
      } catch (e) {
        setErrStatus({
          err: true,
          errText: 'Doslo je do greske na serveru!'
        });
      }
      return;
    
  

    }
  });

  useEffect(() => setErrStatus({err: false, errText: ''}),[values.password, values.mail]);

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="form-auth">
        <h2 className="form-heading">Pridruži se</h2>
        <InputText
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          required
          type="text"
          placeholder="Tvoje ime"
          data-testid="name"
          id='name'
        />
      {errors.name && touched.name && <Message severity='error' text={errors.name} style={{width: '100%'}}/>}
        <InputText
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          required
          type="text"
          placeholder="Tvoje prezime"
          data-testid="lastName"
          id='lastName'
        />
      {errors.lastName && touched.lastName && <Message severity='error' text={errors.lastName} style={{width: '100%'}}/>}

        <InputText
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mail}
          required
          type="email"
          placeholder="Tvoj mail"
          data-testid="email"
          id='mail'
        />
      {errors.mail && touched.mail && <Message severity='error' text={errors.mail} style={{width: '100%'}}/>}

        <InputText
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          required
          type="password"
          placeholder="Tvoja lozinka"
          data-testid="password"
          id='password'
        />
      {errors.password && touched.password && <Message severity='error' text={errors.password} style={{width: '100%'}}/>}

        <Button
          style={{ width: '100%' }}
          label="Pridruži se"
          type='submit'
        />
        {errStatus.err && <Message severity='error' text={errStatus.errText} style={{width: '100%', backgroundColor: '#ffffff', marginBottom: '0.5vw'}}/>}
       
      </form>

      <div className="links-auth">
        <Link to="/login">Ulogiraj se</Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
