import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../../components/FlashMessage';
import FlashMessageProvider from '../../../context/FlashMessage/flashMessageProvider';
import appStore from '../../../store/index';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ProfilePage from '../../../pages/ProfilePage/ProfilePage';
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
  username: 'Tonkec',
};

const App = () => (
  <Provider store={appStore}>
    <FlashMessageProvider>
      <FlashMessage />
      <Router initialEntries={['/profil']}>
        <Routes>
          <Route path="/profil" element={<ProfilePage />} />
        </Routes>
      </Router>
    </FlashMessageProvider>
  </Provider>
);

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

it('should render the Profile Page with all editable user data', async () => {
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
    ),
    rest.get(
      `${process.env.REACT_APP_BACKEND_PORT}/uploads/avatar/1`,
      (req, res, ctx) => {
        return res(
          ctx.set({
            Accept: 'application/json',
            Authorization: `Bearer sometoken`,
          }),
          ctx.status(200),
          ctx.json([])
        );
      }
    )
  );
  server.listen();
  render(<App />);
  expect(await screen.findByText(userFromApi.firstName)).toBeInTheDocument();
});
