import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import appStore from '../../store/index';

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
