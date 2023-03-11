import { screen } from '@testing-library/react';
import App from '../../App';
import { myCustomRender, createMockedServer } from './helper';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { EMAIL_NOT_VERIFIED } from '../../components/auth/constants';
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

test('renders the login page', async () => {
  myCustomRender(<App />);
  expect(screen.getByText('Ulogiraj se!')).toBeTruthy();
});

test('should not show the email not verified message on mount', async () => {
  myCustomRender(<App />);
  expect(screen.queryByText('Email not verified')).toBeFalsy();
});

test('show email not verified message', async () => {
  const server = createMockedServer({ isVerified: null });
  myCustomRender(<App />);
  const inputEmail = screen.getByPlaceholderText('Email');
  fireEvent.change(inputEmail, { target: { value: notVerifiedUser.email } });

  const inputPassword = screen.getByPlaceholderText('Lozinka');
  fireEvent.change(inputPassword, {
    target: { value: notVerifiedUser.password },
  });
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
  server.listen();
  await screen.findByText(EMAIL_NOT_VERIFIED);
  server.close();
});

test('should not log in with the wrong credentials', async () => {
  const server = createMockedServer({ isVerified: null });
  myCustomRender(<App />);

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
  server.listen();
});

test('not showing of email not verified message and should log in with the correct credentials', async () => {
  const server = createMockedServer({ isVerified: true });
  myCustomRender(<App />);
  const inputEmail = screen.getByPlaceholderText('Email');
  fireEvent.change(inputEmail, { target: { value: verifiedUser.email } });

  const inputPassword = screen.getByPlaceholderText('Lozinka');
  fireEvent.change(inputPassword, {
    target: { value: verifiedUser.password },
  });
  userEvent.click(screen.getByRole('button', { name: 'Login' }));
  server.listen();
  await screen.findByText('Tvoj Dashboard');
  server.close();
});
