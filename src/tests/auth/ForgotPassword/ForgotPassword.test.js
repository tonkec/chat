import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../../components/FlashMessage';
import FlashMessageProvider from '../../../context/FlashMessage/flashMessageProvider';
import appStore from '../../../store/index';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../../router/ProtectedRoute';
import HomePage from '../../../pages/HomePage';
import ForgotPassword from '../../../components/auth/ForgotPassword';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Login from '../../../components/auth/Login';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const App = () => (
  <Provider store={appStore}>
    <FlashMessageProvider>
      <FlashMessage />
      <Router initialEntries={['/', '/login', `/forgot-password`]}>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </FlashMessageProvider>
  </Provider>
);
test('renders the forgot password page', () => {
  render(<App />);
  expect(screen.getByText('Zaboravljena lozinka')).toBeTruthy();
});

test('it should disable button if email is invalid', async () => {
  render(<App />);
  const inputEmail = screen.getByTestId('email');
  await userEvent.type(inputEmail, '1');
  expect(
    screen.getByRole('button', {
      name: /Zatraži novu lozinku/i,
    })
  ).toHaveAttribute('disabled');
  expect(screen.getByText('Invalid email')).toBeTruthy();
});

test('it should redirect to login if email is valid', async () => {
  const server = setupServer(
    rest.post(
      `${process.env.REACT_APP_BACKEND_PORT}/forgot-password`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            avatar: 'http://placekitten.com/200/300',
            isVerified: true,
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOm51bGwsImlkIjo0NSwiZmlyc3ROYW1lIjoiYSIsImxhc3ROYW1lIjoidiIsImVtYWlsIjoiYW50b25pamExMDIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE5pVjRMN2k3S25zVGxQLktyU3pYZ09xV3hycWxTTWZRaTVFOGpCTzhpSGRzWXozeC9udDYyIiwiZ2VuZGVyIjoiZmVtYWxlIiwiaXNWZXJpZmllZCI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMy0wMy0wN1QxODozNjo1MS44MDZaIiwidXBkYXRlZEF0IjoiMjAyMy0wMy0wOVQxMjoxMjo0Ny44NDNaIiwiaWF0IjoxNjc4ODA2ODYyLCJleHAiOjE3NjUyMDY4NjJ9.T7KGQrRVNRr7-hEDuFSinW9az72fTkoOGdI1JSQo5Ng',
          })
        );
      }
    )
  );

  server.listen();
  render(<App />);
  const inputEmail = screen.getByTestId('email');
  userEvent.type(inputEmail, 'antonija1023@gmail.com');
  userEvent.click(screen.getByRole('button', { name: 'Zatraži novu lozinku' }));
  expect(await screen.findByText('Ulogiraj se!')).toBeInTheDocument();
  server.close();
});
