import { useEffect } from 'react';
import './Navbar.scss';
import Dropdown from '../../Dropdown';

import { useSelector, useDispatch } from 'react-redux';
import { setUserOffline, setUserOnline } from '../../../store/actions/user';
import socketIOClient from 'socket.io-client';
import { setSocket } from '../../../store/actions/chat';
import { setOnlineUsers } from './../../../store/actions/user';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const currentUser = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);
  const isCurrentUserOnline = JSON.parse(
    localStorage.getItem('online') || false
  );

  const shouldConnectToSocket = isLoggedIn && currentUser;

  const onOnline = () => {
    localStorage.setItem('online', true);
    dispatch(setUserOnline(currentUser));
  };

  const onOffline = () => {
    localStorage.setItem('online', false);
    dispatch(setUserOffline(currentUser));
  };

  useEffect(() => {
    if (shouldConnectToSocket) {
      const socket = socketIOClient.connect(process.env.REACT_APP_BACKEND_PORT);
      dispatch(setSocket(socket));
      isCurrentUserOnline && socket.emit('login', currentUser);
    }
  }, [
    isLoggedIn,
    currentUser,
    shouldConnectToSocket,
    dispatch,
    isCurrentUserOnline,
  ]);

  return (
    <nav className="navbar">
      <Dropdown onOfflineClick={onOffline} onOnlineClick={onOnline} />
    </nav>
  );
};

export default Navbar;
