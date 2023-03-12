import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FlashMessage from '../../components/FlashMessage';
import FlashMessageProvider from '../../context/FlashMessage/flashMessageProvider';
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
    <Provider store={appStore}>
      <FlashMessageProvider>
        <FlashMessage />
        {children}
      </FlashMessageProvider>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
