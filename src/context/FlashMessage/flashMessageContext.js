import React from 'react';
const FlashMessageContext = React.createContext({
  notification: null,
  notificationText: null,
  success: () => {},
  error: () => {},
  close: () => {},
});

export default FlashMessageContext;
