import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import NotificationBar from '../../components/Notification';
import NotificationProvider from '../../context/Notification/notificationProvider';
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
      <NotificationProvider>
        <NotificationBar />
        {children}
      </NotificationProvider>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
