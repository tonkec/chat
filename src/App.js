import './App.scss';
import RoutesComponent from './router';
import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers } from './store/actions/user';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const currentUser = useSelector((state) => state.authReducer.user);
  const shouldConnectToSocket = isLoggedIn && currentUser;
  useEffect(() => {
    if (shouldConnectToSocket) {
      const socket = socketIOClient.connect(process.env.REACT_APP_BACKEND_PORT);
      socket.emit('login', currentUser);
      socket.on('get-users', (users) => dispatch(setOnlineUsers(users)));
    }
  }, [isLoggedIn, currentUser, shouldConnectToSocket, dispatch]);
  return <RoutesComponent />;
};

export default App;
