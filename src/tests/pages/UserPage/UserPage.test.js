import { screen, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../../components/FlashMessage';
import FlashMessageProvider from '../../../context/FlashMessage/flashMessageProvider';
import appStore from '../../../store/index';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from '../../../pages/UserPage';
import userEvent from '@testing-library/user-event';
import { server } from '../../../tests/mocks/server';
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

  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const App = () => (
  <Provider store={appStore}>
    <FlashMessageProvider>
      <FlashMessage />
      <Router initialEntries={['/user/1']}>
        <Routes>
          <Route path='/user/:id' element={<UserPage />} />
        </Routes>
      </Router>
    </FlashMessageProvider>
  </Provider>
);

it('should render the User page with bio placeholder', async () => {
  render(<App />);
  // https://stackoverflow.com/a/71955750
  await waitFor(() => {
    expect(screen.getByText('Bio:')).toBeInTheDocument();
  });
});

it('should increase the number of followers on the button click', async () => {
  render(<App />);

  expect(screen.getByText('Followers: 0')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Follow' }));
  await waitFor(() => {
    expect(screen.getByText('Followers: 1')).toBeInTheDocument();
  });
});

// it('should decrease the number of followers on the button click', async () => {
//   render(<App />);

//   await userEvent.click(screen.getByRole('button', { name: 'Follow' }));
//   await waitFor(() => {
//     expect(screen.getByText('Followers: 1')).toBeInTheDocument();
//   });

//   await userEvent.click(screen.getByRole('button', { name: 'Unfollow' }));
//   await waitFor(() => {
//     expect(screen.getByText('Followers: 0')).toBeInTheDocument();
//   });
// });

it("should render the user's photos", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Fotografije')).toBeInTheDocument();
  });
});

it('should render the user name', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('antonija')).toBeInTheDocument();
  });
});
