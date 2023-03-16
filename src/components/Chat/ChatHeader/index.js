import { userStatus } from '../../../utlis/helpers';
import { useSelector } from 'react-redux';
import ChatService from '../../../services/chatService';
import { useNavigate } from 'react-router-dom';
import './ChatHeader.scss';

const ChatHeader = ({ chat }) => {
  const navigate = useNavigate();

  const socket = useSelector((state) => state.chatReducer.socket);

  const deleteChat = () => {
    ChatService.deleteCurrentChat(chat.id).then((data) => {
      socket.emit('delete-chat', data);
      navigate('/');
    });
  };

  return (
    <>
      {chat.type === 'dual' ? (
        <div onClick={() => deleteChat()} className="delete-chat">
          <p>Obriši razgovor</p>
        </div>
      ) : null}
      <div className="chat-header">
        <div>
          {chat.Users &&
            chat.Users.map((user) => {
              return (
                <div className="chatter-info" key={user.id}>
                  <img
                    src={user.avatar}
                    alt="user avatar"
                    className="user-avatar"
                  />
                  <h3>{user.firstName}</h3>
                  <div className="chatter-status">
                    <span
                      className={`online-status ${userStatus(user)}`}
                    ></span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
