import { screen, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import appStore from '../../../store/index';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from '../../../pages/UserPage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// https://github.com/jestjs/jest/issues/6434
global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

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

beforeAll(() => {
  appStore.dispatch({
    type: 'LOGIN',
    payload: {
      ...userFromApi,
      token: 'sometoken',
      isLoggedIn: true,
      isVerified: true,
    },
  });
});

const App = () => (
  <Provider store={appStore}>
      <Router initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </Router>
  </Provider>
);

it('should render the User page with bio placeholder', async () => {
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

  // https://stackoverflow.com/a/71955750
  await waitFor(() => {
    expect(screen.getByText('Bio:')).toBeInTheDocument();
  });
});
