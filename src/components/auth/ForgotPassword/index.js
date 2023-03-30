import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../store/actions/auth';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import { EMAIL_INVALID, SOMETHING_WENT_WRONG } from '../constants';
import FlashMessageContext from '../../../context/FlashMessage/flashMessageContext';
import isEmailValid from '../validators/emailValidator';
import './../Auth.scss';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const flashMessageContext = useContext(FlashMessageContext);
  const handleValidInput = (value) => {
    setEmail(value);
    flashMessageContext.close();
    setDisabled(false);
  };

  const handleInvalidInput = (error) => {
    flashMessageContext.error(error);
    setDisabled(true);
  };

  const onEmailChange = (e) => {
    const value = e.target.value;
    const validEmail = isEmailValid(value);
    if (validEmail) {
      handleValidInput(value);
      return;
    }
    handleInvalidInput(EMAIL_INVALID);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(forgotPassword(email, navigate));
    } catch (e) {
      flashMessageContext.error(SOMETHING_WENT_WRONG);
    }
  };
  return (
    <AuthLayout>
      <form className="form-auth">
        <h3 className="form-heading">Zaboravljena lozinka</h3>
        <input
          type="email"
          placeholder="Tvoj email"
          required
          onChange={onEmailChange}
          data-testid="email"
        />
        <button onClick={onHandleSubmit} disabled={isDisabled}>
          Zatraži novu lozinku
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
