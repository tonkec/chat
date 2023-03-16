import React, { useState } from 'react';
import { register } from '../../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import './../Auth.scss';
const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('female');

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register({ email, password, firstName, lastName, gender }, navigate)
    );

    //TODO only redirect if response is 200
    navigate(`/login`);
  };
  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className="form-auth">
        <h2 className="form-heading">Pridruži se</h2>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required
          type="text"
          placeholder="Tvoje ime"
        />

        <input
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
          type="text"
          placeholder="Tvoje prezime"
        />

        <select
          data-testid="select"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          type="email"
          placeholder="Tvoj mail"
          data-testid="email"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          type="password"
          placeholder="Tvoja lozinka"
        />

        <button>Pridruži se</button>
      </form>

      <div className="links-auth">
        <Link to="/login">Ulogiraj se</Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
