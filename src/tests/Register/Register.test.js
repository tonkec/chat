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
import Register from '../../components/auth/Register';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../router/ProtectedRoute';
import HomePage from '../../pages/HomePage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

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

test('renders the register page', async () => {
  render(<App />);
  expect(screen.getAllByText('Pridruži se')).toBeTruthy();
});
