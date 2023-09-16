import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FriendList from './FriendList';
import './Chat.scss';
import useSocket from '../../hooks/socketConnect';
const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user);
  useSocket(dispatch, user);

  return <FriendList />;
};

export default Chat;
