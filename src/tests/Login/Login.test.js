import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import {
  EMAIL_NOT_VERIFIED,
  INVALID_CREDENTIALS,
} from '../../components/auth/constants';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../components/FlashMessage';
import FlashMessageProvider from '../../context/FlashMessage/flashMessageProvider';
import appStore from '../../store/index';
import Login from '../../components/auth/Login';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../router/ProtectedRoute';
import HomePage from '../../pages/HomePage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const user = {
  email: 'antonija1023@gmail.com',
  password: 'glitch',
};

const App = () => (
  <Provider store={appStore}>
    <FlashMessageProvider>
      <FlashMessage />
      <Router initialEntries={['/', '/login']}>
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
  const server = setupServer(
    rest.post(
      `${process.env.REACT_APP_BACKEND_PORT}/login`,
      (req, res, ctx) => {
        const { email, password } = req.body;

        return res(
          ctx.json({
            id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
            isVerified: null,
            email,
            password,
          })
        );
      }
    )
  );
  server.listen();
  render(<App />);
  const inputEmail = screen.getByPlaceholderText('Email');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputEmail, user.email);
  });

  const inputPassword = screen.getByPlaceholderText('Lozinka');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputPassword, user.password);
  });
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
  await screen.findByText(EMAIL_NOT_VERIFIED);
  server.close();
});

test('should not log in with the wrong credentials', async () => {
  const server = setupServer(
    rest.post(
      `${process.env.REACT_APP_BACKEND_PORT}/login`,
      (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({
            message: 'User not found',
          })
        );
      }
    )
  );
  render(<App />);

  server.listen();

  const inputEmail = screen.getByPlaceholderText('Email');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputEmail, user.email);
  });

  const inputPassword = screen.getByPlaceholderText('Lozinka');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputPassword, user.password);
  });
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
  await screen.findByText(INVALID_CREDENTIALS);
  server.close();
});

test('not showing of email not verified message and should log in with the correct credentials', async () => {
  const server = setupServer(
    rest.post(
      `${process.env.REACT_APP_BACKEND_PORT}/login`,
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
  const inputEmail = screen.getByPlaceholderText('Email');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputEmail, user.email);
  });

  const inputPassword = screen.getByPlaceholderText('Lozinka');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(inputPassword, user.password);
  });
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
  await screen.findByText('Tvoj Dashboard');
  server.close();
});
