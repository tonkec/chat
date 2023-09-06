import { useContext, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  resetPassword,
  getResetPasswordToken,
} from '../../../store/actions/auth';
import AuthLayout from '../../Layout/AuthLayout';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './../Auth.scss';
import { PasswordChangeSchema } from '../../validations/profileValidation';
import { Message } from 'primereact/message';
import {useFormik} from 'formik';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [errStatus, setErrStatus] = useState({
    err: false,
    errText: '',
  });
  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched} = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: ''


    },
    validationSchema: PasswordChangeSchema,
    onSubmit: async(values) => {
      const e = window.event;
      e.preventDefault();
      const password = values.password
      if (!token) {
        return;
      }
  
      try {
        dispatch(getResetPasswordToken(email, token));
        dispatch(resetPassword(password, email));
        navigate('/login');
      } catch (e) {
        setErrStatus({
          err: true,
          errText: 'Doslo je do greske na serveru!'
        });
      }
  

    }
  });

  useEffect(() => setErrStatus({err: false, errText: ''}),[values.password, values.mail]);

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
                {errStatus.err && <Message severity='error' text={errStatus.errText} style={{width: '100%', backgroundColor: '#ffffff', marginBottom: '0.5vw'}}/>}

      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
