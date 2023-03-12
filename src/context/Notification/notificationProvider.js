import { useState } from 'react';
import NotificationContext from './notificationContext';
import { STATES } from './constants';

const NotificationProvider = (props) => {
  const [notification, setNotification] = useState(null);
  const [notificationText, setNotificationText] = useState(null);
  const success = (text) => {
    setNotificationText(text);
    setNotification(STATES.SUCCESS);
  };
  const error = (text) => {
    setNotificationText(text);
    setNotification(STATES.ERROR);
  };
  const close = () => {
    setNotificationText(null);
    setNotification(null);
  };
  return (
    <NotificationContext.Provider
      value={{
        success,
        error,
        close,
        notification,
        notificationText,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
