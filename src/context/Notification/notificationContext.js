import React from 'react';
const NotificationContext = React.createContext({
  notification: null,
  notificationText: null,
  success: () => {},
  error: () => {},
  close: () => {},
});

export default NotificationContext;
