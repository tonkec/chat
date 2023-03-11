import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import appStore from '../../store/index';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const myCustomRender = (
  ui,
  {
    initialState = {
      user: {},
      token: '',
      isLoggedIn: false,
      isVerified: null,
    },
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={appStore}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export const createMockedServer = (data) => {
  const server = setupServer(
    rest.post(process.env.REACT_APP_BACKEND_PORT, (req, res, ctx) => {
      return res(
        ctx.json({
          data: data,
        })
      );
    })
  );
  return server;
};
