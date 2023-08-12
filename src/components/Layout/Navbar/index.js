import { useEffect } from 'react';
import './Navbar.scss';
import Dropdown from '../../Dropdown';

import { useSelector, useDispatch } from 'react-redux';
import {
  setUserOffline,
  setUserOnline,
  setOnlineUsers,
} from '../../../store/actions/user';
import socketIOClient from 'socket.io-client';
import {
  onlineFriend,
  setSocket,
  offlineFriend,
  onlineFriends,
} from '../../../store/actions/chat';

import useSocket from '../../../hooks/socketConnect';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const currentUser = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);
  const chats = useSelector((state) => state.chatReducer);
  const user = useSelector((state) => state.userReducer);

  const isCurrentUserOnline = JSON.parse(
    localStorage.getItem('online') || false
  );

  const shouldConnectToSocket = isLoggedIn && currentUser;

  const onOnline = () => {
    localStorage.setItem('online', true);
    socket.emit('has-gone-online', currentUser);
  };

  const onOffline = () => {
    localStorage.setItem('online', false);
    socket.emit('has-gone-offline', currentUser);
  };

  useEffect(() => {
    if (shouldConnectToSocket) {
      const socket = socketIOClient.connect(process.env.REACT_APP_BACKEND_PORT);
      dispatch(setSocket(socket));
      socket.on('save-users-to-store', (users) => {
        dispatch(setOnlineUsers(users));
      });
    }
  }, [
    currentUser,
    dispatch,
    isLoggedIn,
    isCurrentUserOnline,
    shouldConnectToSocket,
  ]);

  return (
    <nav className="navbar">
      <Dropdown onOfflineClick={onOffline} onOnlineClick={onOnline} />
    </nav>
  );
};

export default Navbar;
