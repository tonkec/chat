import { useState, Fragment } from 'react';
import { userStatus } from '../../../utlis/helpers';
import { useSelector } from 'react-redux';
import Modal from '../../Modal';
import ChatService from '../../../services/chatService';
const ChatHeader = ({ chat }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const socket = useSelector((state) => state.chatReducer.socket);

  const searchFriends = (e) => {
    ChatService.searchUsers(e.target.value).then((res) => setSuggestions(res));
  };

  const addNewFriend = (id) => {
    ChatService.addFriendToGroupChat(id, chat.id)
      .then((data) => {
        socket.emit('add-user-to-group', data);
        setShowAddFriendModal(false);
      })
      .catch((err) => console.log(err));
  };

  const leaveChat = () => {
    ChatService.leaveCurrentChat(chat.id)
      .then((data) => {
        socket.emit('leave-current-chat', data);
      })
      .catch((err) => console.log(err));
  };

  const deleteChat = () => {
    ChatService.deleteCurrentChat(chat.id).then((data) => {
      socket.emit('delete-chat', data);
    });
  };

  return (
    <>
      <div id="chatter">
        {chat.Users.map((user) => {
          return (
            <div className="chatter-info" key={user.id}>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div className="chatter-status">
                <span className={`online-status ${userStatus(user)}`}></span>
              </div>
            </div>
          );
        })}
      </div>
      <div onClick={() => setShowOptions(!showOptions)}>options</div>

      {showOptions ? (
        <div id="settings">
          <div onClick={() => setShowAddFriendModal(true)}>
            <p>Add user to chat</p>
          </div>

          {chat.type === 'group' ? (
            <div onClick={() => leaveChat()}>
              <p>Leave chat</p>
            </div>
          ) : null}

          {chat.type === 'dual' ? (
            <div onClick={() => deleteChat()}>
              <p>Delete chat</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {showAddFriendModal && (
        <Modal click={() => setShowAddFriendModal(false)}>
          <Fragment key="header">
            <h3 className="m-0">Add friend to group chat</h3>
          </Fragment>

          <Fragment key="body">
            <p>Find friends by typing their name bellow</p>
            <input
              onInput={(e) => searchFriends(e)}
              type="text"
              placeholder="Search..."
            />
            <div id="suggestions">
              {suggestions.map((user) => {
                return (
                  <div key={user.id} className="suggestion">
                    <p className="m-0">
                      {user.firstName} {user.lastName}
                    </p>
                    <button onClick={() => addNewFriend(user.id)}>ADD</button>
                  </div>
                );
              })}
            </div>
          </Fragment>
        </Modal>
      )}
    </>
  );
};

export default ChatHeader;
