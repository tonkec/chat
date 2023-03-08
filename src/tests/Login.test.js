import { render, screen } from '@testing-library/react';
import { Provider, connect } from 'react-redux';
import App from './../App';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from '../store/reducers/auth';
import chatReducer from '../store/reducers/chat';
import thunk from 'redux-thunk';

const myCustomRender = (
  ui,
  {
    initialState = {
      user: {},
      token: '',
      isLoggedIn: false,
      isVerified: null,
    },
    store = createStore(
      combineReducers({
        authReducer,
        chatReducer,
      }),
      applyMiddleware(thunk)
    ),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

test('renders the landing page', () => {
  myCustomRender(<App />);

  expect(screen.getByText('Welcome back')).toBeTruthy();
});
