import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../../components/FlashMessage';
import FlashMessageProvider from '../../../context/FlashMessage/flashMessageProvider';
import appStore from '../../../store/index';
import Register from '../../../components/auth/Register';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../../router/ProtectedRoute';
import HomePage from '../../../pages/HomePage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Login from '../../../components/auth/Login';
import {
  EMAIL_INVALID,
  LAST_NAME_EMPTY,
  NAME_EMPTY,
  PASSWORD_MIN_CHARACTERS,
} from '../../../components/auth/constants';

const user = {
  firstName: 'antonija',
  lastName: 'simic',
  gender: 'male',
  email: 'antonija1024@gmail.com',
  password: 'glitch',
};

const App = () => (
  <Provider store={appStore}>
    <FlashMessageProvider>
      <FlashMessage />
      <Router initialEntries={['/', '/login', '/register']}>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </FlashMessageProvider>
  </Provider>
);

test('renders the register page', () => {
  render(<App />);
  expect(screen.getAllByText('Pridruži se')).toBeTruthy();
});

test('show error message when email is not valid', async () => {
  render(<App />);
  const inputEmail = screen.getByTestId('email');
  await userEvent.type(inputEmail, '1!.a');

  expect(screen.getByText(EMAIL_INVALID)).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /Pridruži se/i,
    })
  ).toHaveAttribute('disabled');
});

test('show error message when email is empty', async () => {
  render(<App />);
  const inputEmail = screen.getByTestId('email');
  await userEvent.type(inputEmail, '   ');

  expect(screen.getByText(EMAIL_INVALID)).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /Pridruži se/i,
    })
  ).toHaveAttribute('disabled');
});

test('show error message when first name is not valid', async () => {
  render(<App />);
  const inputName = screen.getByTestId('name');
  await userEvent.type(inputName, '    ');

  expect(screen.getByText(NAME_EMPTY)).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /Pridruži se/i,
    })
  ).toHaveAttribute('disabled');
});

test('show error message when last name is not valid', async () => {
  render(<App />);
  const inputName = screen.getByTestId('lastName');
  await userEvent.type(inputName, '    ');

  expect(screen.getByText(LAST_NAME_EMPTY)).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /Pridruži se/i,
    })
  ).toHaveAttribute('disabled');
});

test('show error message when password is not valid', async () => {
  render(<App />);
  const inputName = screen.getByTestId('password');
  await userEvent.type(inputName, '1');
  expect(screen.getByText(PASSWORD_MIN_CHARACTERS)).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /Pridruži se/i,
    })
  ).toHaveAttribute('disabled');
});

test('redirects to the login page after successful signup', async () => {
  const server = setupServer(
    rest.post(
      `${process.env.REACT_APP_BACKEND_PORT}/register`,
      (req, res, ctx) => {
        const { email, password, gender, firstName, lastName } = req.body;
        return res(
          ctx.status(200),
          ctx.json({
            email,
            password,
            gender,
            firstName,
            lastName,
            avatar: null,
            isVerified: null,
          })
        );
      }
    )
  );
  server.listen();
  render(<App />);
  const inputEmail = screen.getByTestId('email');
  const inputPassword = screen.queryByPlaceholderText('Tvoja lozinka');
  const inputFirstName = screen.queryByPlaceholderText('Tvoje ime');
  const inputLastName = screen.queryByPlaceholderText('Tvoje prezime');

  await userEvent.type(inputEmail, user.email);
  await userEvent.type(inputPassword, user.password);
  await userEvent.type(inputLastName, user.lastName);
  await userEvent.type(inputFirstName, user.firstName);
  await userEvent.selectOptions(screen.getByTestId('select'), 'male');
  await userEvent.click(screen.getByRole('button', { name: 'Pridruži se' }));
  expect(await screen.findByText('Login')).toBeInTheDocument();
  server.close();
});
