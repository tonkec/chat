import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../store/actions/auth";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layout/AuthLayout";
import { EMAIL_INVALID } from "../constants";
import FlashMessageContext from "../../../context/FlashMessage/flashMessageContext";
import isEmailValid from "../validators/emailValidator";
import "./../Auth.scss";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const flashMessageContext = useContext(FlashMessageContext);
  const handleValidInput = (action, value) => {
    switch (action) {
      case "email": {
        setEmail(value);
        break;
      }

      default: {
        console.log("Invalid value for validation type");
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
      handleValidInput("email", value);
      return;
    }
    handleInvalidInput(EMAIL_INVALID);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, navigate));
  };
  return (
    <AuthLayout>
      <form className="form-auth">
        <h3 className="form-heading">Tvoj email</h3>
        <input
          type="email"
          placeholder="Tvoj email"
          required
          onChange={onEmailChange}
        />
        <button onClick={onHandleSubmit} disabled={isDisabled}>
          Zatraži novu lozinku
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
