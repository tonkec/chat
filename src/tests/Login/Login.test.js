import { screen } from '@testing-library/react';
import App from '../../App';
import { myCustomRender, createMockedServer } from './helper';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { EMAIL_NOT_VERIFIED } from '../../components/auth/constants';
const user = {
  email: 'antonija1023@gmail.com',
  password: 'glitch',
};

test('renders the login page', async () => {
  myCustomRender(<App />);
  expect(screen.getByText('Ulogiraj se!')).toBeTruthy();
});

test('email verification failure', async () => {
  // mock failing login endpoint
  const server = createMockedServer({ isVerified: false });
  myCustomRender(<App />);
  const inputEmail = screen.getByPlaceholderText('Email');
  fireEvent.change(inputEmail, { target: { value: user.email } });

  const inputPassword = screen.getByPlaceholderText('Lozinka');
  fireEvent.change(inputPassword, {
    target: { value: user.password },
  });
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
  server.listen();
  await screen.findByText(EMAIL_NOT_VERIFIED);
  server.close();
});

test('email verification succcess', async () => {
  // mock successful login endpoint
  myCustomRender(<App />);
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
  // check whether URL has changed to home, or some other check
});
