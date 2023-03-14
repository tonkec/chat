import { useState, Fragment } from 'react';
import { userStatus } from '../../../utlis/helpers';
import { useSelector } from 'react-redux';
import Modal from '../../Modal';
import ChatService from '../../../services/chatService';
import { SlOptionsVertical } from 'react-icons/sl';
import './ChatHeader.scss';

const ChatHeader = ({ chat }) => {
  const [showOptions, setShowOptions] = useState(false);

  const socket = useSelector((state) => state.chatReducer.socket);

  const deleteChat = () => {
    ChatService.deleteCurrentChat(chat.id).then((data) => {
      socket.emit('delete-chat', data);
    });
  };

  return (
    <>
      <div className="chat-header">
        <div>
          {chat.Users &&
            chat.Users.map((user) => {
              return (
                <div className="chatter-info" key={user.id}>
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <div className="chatter-status">
                    <span
                      className={`online-status ${userStatus(user)}`}
                    ></span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="options" onClick={() => setShowOptions(!showOptions)}>
          <SlOptionsVertical />
        </div>
      </div>

      {showOptions ? (
        <div className="settings">
          {chat.type === 'dual' ? (
            <div onClick={() => deleteChat()}>
              <p>Delete chat</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default ChatHeader;
