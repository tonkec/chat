import { useState } from 'react';
import { STATES } from './constants';
import FlashMessageContext from './flashMessageContext';

const FlashMessageProvider = (props) => {
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
    <FlashMessageContext.Provider
      value={{
        success,
        error,
        close,
        notification,
        notificationText,
      }}
    >
      {props.children}
    </FlashMessageContext.Provider>
  );
};

export default FlashMessageProvider;
