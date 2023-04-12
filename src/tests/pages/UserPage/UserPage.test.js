import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../../components/FlashMessage';
import FlashMessageProvider from '../../../context/FlashMessage/flashMessageProvider';
import appStore from '../../../store/index';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from '../../../pages/UserPage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const userFromApi = {
  avatar: 'http://placekitten.com/200/300',
  id: 1,
  firstName: 'antonija',
  lastName: 'v',
  email: 'antonija1023@gmail.com',
  password: 'jadajajad',
  gender: 'female',
  isVerified: true,
  createdAt: '2023-03-07T18:36:51.806Z',
  updatedAt: '2023-03-28T08:19:29.175Z',
  location: 'Zagreb',
};

const App = () => (
  <Provider store={appStore}>
    <FlashMessageProvider>
      <FlashMessage />
      <Router initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </Router>
    </FlashMessageProvider>
  </Provider>
);

it('should render the User page with bio placeholder', async () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      id: '1',
    }),
    useRouteMatch: () => ({ url: '/user/1' }),
  }));
  const server = setupServer(
    rest.get(
      `${process.env.REACT_APP_BACKEND_PORT}/users/1`,
      (req, res, ctx) => {
        return res(
          ctx.set({
            Accept: 'application/json',
            Authorization: `Bearer sometoken`,
          }),
          ctx.status(200),
          ctx.json(userFromApi)
        );
      }
    )
  );
  server.listen();
  render(<App />);
  expect(await screen.findByText('Bio:')).toBeInTheDocument();
});
