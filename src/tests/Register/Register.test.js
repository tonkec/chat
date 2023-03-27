import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../components/FlashMessage';
import FlashMessageProvider from '../../context/FlashMessage/flashMessageProvider';
import appStore from '../../store/index';
import Register from '../../components/auth/Register';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../router/ProtectedRoute';
import HomePage from '../../pages/HomePage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Login from '../../components/auth/Login';
import { EMAIL_INVALID } from '../../components/auth/constants';

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

test('show error message when email is not valid', () => {
  render(<App />);
  const inputEmail = screen.getByTestId('email');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputEmail, '1!.a');
  });
  expect(screen.getByText(EMAIL_INVALID)).toBeInTheDocument();
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
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputEmail, user.email);
  });

  const inputPassword = screen.queryByPlaceholderText('Tvoja lozinka');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputPassword, user.password);
  });
  const inputFirstName = screen.queryByPlaceholderText('Tvoje ime');

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputFirstName, user.firstName);
  });

  const inputLastName = screen.queryByPlaceholderText('Tvoje prezime');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputLastName, user.lastName);
  });

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.selectOptions(screen.getByTestId('select'), 'male');
  });

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.click(screen.getByRole('button', { name: 'Pridruži se' }));
  });
  expect(screen.getByTestId('location-display')).toHaveTextContent('/login');
  server.close();
});
