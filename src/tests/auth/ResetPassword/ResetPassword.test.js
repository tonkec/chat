import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../../components/FlashMessage';
import FlashMessageProvider from '../../../context/FlashMessage/flashMessageProvider';
import appStore from '../../../store/index';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../../router/ProtectedRoute';
import HomePage from '../../../pages/HomePage';
import ResetPassword from '../../../components/auth/ResetPassword';

const App = () => (
  <Provider store={appStore}>
    <FlashMessageProvider>
      <FlashMessage />
      <Router initialEntries={['/', '/reset-password']}>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<HomePage />} />
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </FlashMessageProvider>
  </Provider>
);

test('renders the reset password page', async () => {
  render(<App />);
  expect(screen.getByText('Promjena lozinke')).toBeTruthy();
});
