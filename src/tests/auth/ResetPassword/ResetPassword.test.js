import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../../components/FlashMessage';
import FlashMessageProvider from '../../../context/FlashMessage/flashMessageProvider';
import appStore from '../../../store/index';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../../router/ProtectedRoute';
import HomePage from '../../../pages/HomePage';
import ResetPassword from '../../../components/auth/ResetPassword';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Login from '../../../components/auth/Login';

const renderApp = (token, email) => {
  const App = () => (
    <Provider store={appStore}>
      <FlashMessageProvider>
        <FlashMessage />
        <Router
          initialEntries={[
            '/',
            '/login',
            `/reset-password?token=${token}&email=${email}`,
          ]}
        >
          <Routes>
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route exact path="/" element={<HomePage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Router>
      </FlashMessageProvider>
    </Provider>
  );
  render(<App />);
};

test('renders the reset password page', () => {
  renderApp(123, 'antonija1023@gmail.com');
  expect(screen.getByText('Promjena lozinke')).toBeTruthy();
});

test('it should get the correct email param', () => {
  renderApp(123, 'antonija1023@gmail.com');
  expect(screen.getByTestId('params')).toHaveTextContent(
    'antonija1023@gmail.com'
  );
});

test('it should get the correct token param', () => {
  renderApp(123, 'antonija1023@gmail.com');
  expect(screen.getByTestId('params')).toHaveTextContent('123');
});

test('it should not submit the form if passwords are mismatched', () => {
  renderApp(123, 'antonija1023@gmail.com');
  const inputPassword = screen.getByTestId('password');
  const inputPasswordConfirmation = screen.getByTestId('confirmationPassword');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputPassword, '1');
    userEvent.type(inputPasswordConfirmation, '2');
  });

  expect(
    screen.getByRole('button', {
      name: /Promijeni lozinku/i,
    })
  ).toHaveAttribute('disabled');
});

test('it should show an error message if there are params missing', () => {
  renderApp('', '');
  const inputPassword = screen.getByTestId('password');
  const inputPasswordConfirmation = screen.getByTestId('confirmationPassword');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputPassword, '123456');
    userEvent.type(inputPasswordConfirmation, '123456');
    userEvent.click(screen.getByRole('button', { name: 'Promijeni lozinku' }));
  });
  screen.getByText('Something is wrong with the token');
});

test('it should submit the form if it is valid and all params exist', () => {
  renderApp(123, 'antonija1023@gmail.com');
  const inputPassword = screen.getByTestId('password');
  const inputPasswordConfirmation = screen.getByTestId('confirmationPassword');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputPassword, '123456');
    userEvent.type(inputPasswordConfirmation, '123456');
    userEvent.click(screen.getByRole('button', { name: 'Promijeni lozinku' }));
  });
  screen.getByText('Ulogiraj se!');
});
