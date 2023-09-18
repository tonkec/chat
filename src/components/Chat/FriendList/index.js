import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Friend from "../Friend";
import { setCurrentChat } from "../../../store/actions/chat";
import Modal from "../../Modal";
import ChatService from "../../../services/chatService";
import "./FriendList.scss";
import { useNavigate } from "react-router";

const FriendList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chats = useSelector(state => state.chatReducer.chats);
  const socket = useSelector(state => state.chatReducer.socket);

  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const openChat = chat => {
    dispatch(setCurrentChat(chat));
    navigate(`/poruka/${chat.id}`, {
      state: chat,
    });
  };

  const searchFriends = e => {
    ChatService.searchUsers(e.target.value).then(res => setSuggestions(res));
  };

  const addNewFriend = id => {
    ChatService.createChat(id)
      .then((chats) => {
        socket.emit("add-friend", chats);
        setShowFriendsModal(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='friend-list'>
      <div className='friend-action'>
        <button
          className='button-inline-block'
          onClick={() => setShowFriendsModal(true)}
        >
          Nova poruka
        </button>
      </div>

      <div className='friend-container'>
        {chats.length > 0 &&
          chats.map(chat => {
            return (
              <Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
            );
          })}
      </div>
      {showFriendsModal && (
        <Modal click={() => setShowFriendsModal(false)}>
          <Fragment key='header'>
            <h5 className='m-0'>Nova poruka</h5>
          </Fragment>

          <Fragment key='body'>
            <p>Odaberi osobu s kojom želiš pričati...</p>
            <input
              onInput={e => searchFriends(e)}
              type='text'
              placeholder='Pretraži...'
            />
            <div id='suggestions'>
              {suggestions.map(user => {
                return (
                  <div
                    key={user.id}
                    className='suggestion'
                    onClick={() => addNewFriend(user.id)}
                  >
                    <p className='m-0'>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                );
              })}
            </div>
          </Fragment>
        </Modal>
      )}
    </div>
  );
};

export default FriendList;
