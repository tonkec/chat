import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { EMAIL_NOT_VERIFIED } from '../../components/auth/constants';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../components/FlashMessage';
import FlashMessageProvider from '../../context/FlashMessage/flashMessageProvider';
import appStore from '../../store/index';
import Login from '../../components/auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../router/ProtectedRoute';
import HomePage from '../../pages/HomePage';
const verifiedUser = {
  email: 'antonija1023@gmail.com',
  password: 'glitch',
};

const notVerifiedUser = {
  email: 'notVerified@mail.com',
  password: 'secret',
};

const wrongCredentialsUser = {
  email: 'iamfaker@a.com',
  password: 'secret',
};

const App = () => (
  <Provider store={appStore}>
    <FlashMessageProvider>
      <FlashMessage />
      <Router>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </FlashMessageProvider>
  </Provider>
);

test('renders the login page', async () => {
  render(<App />);
  expect(screen.getByText('Ulogiraj se!')).toBeTruthy();
});

test('should not show the email not verified message on mount', async () => {
  render(<App />);
  expect(screen.queryByText('Email not verified')).toBeFalsy();
});

test('show email not verified message', async () => {
  render(<App />);
  const inputEmail = screen.getByPlaceholderText('Email');
  fireEvent.change(inputEmail, { target: { value: notVerifiedUser.email } });

  const inputPassword = screen.getByPlaceholderText('Lozinka');
  fireEvent.change(inputPassword, {
    target: { value: notVerifiedUser.password },
  });
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
  await screen.findByText(EMAIL_NOT_VERIFIED);
});

test('should not log in with the wrong credentials', async () => {
  render(<App />);

  const inputEmail = screen.getByPlaceholderText('Email');
  fireEvent.change(inputEmail, {
    target: { value: wrongCredentialsUser.email },
  });

  const inputPassword = screen.getByPlaceholderText('Lozinka');
  fireEvent.change(inputPassword, {
    target: { value: wrongCredentialsUser.password },
  });
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
  await screen.findByText('Ulogiraj se!');
});

test('not showing of email not verified message and should log in with the correct credentials', async () => {
  render(<App />);
  const inputEmail = screen.getByPlaceholderText('Email');
  fireEvent.change(inputEmail, { target: { value: verifiedUser.email } });

  const inputPassword = screen.getByPlaceholderText('Lozinka');
  fireEvent.change(inputPassword, {
    target: { value: verifiedUser.password },
  });
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
  await screen.findByText('Tvoj Dashboard');
});
