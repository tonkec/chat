import React from 'react';
import { useSelector } from 'react-redux';
import ChatHeader from '../ChatHeader/';
import MessageBox from '../MessageBox/';
import MessageInput from '../MessageInput';
import './Messenger.scss';

const Messenger = () => {
  const chat = useSelector((state) => {
    return state.chatReducer.currentChat;
  });

  const activeChat = () => {
    return Object.keys(chat).length > 0;
  };

  return (
    <div>
      {activeChat() && (
        <div>
          <ChatHeader chat={chat} />
          <MessageBox chat={chat} />
          <MessageInput chat={chat} />
        </div>
      )}
    </div>
  );
};

export default Messenger;
