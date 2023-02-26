import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchChats } from "../../store/actions/chat";
import Messenger from "../Messenger";
import FriendList from "../FriendList";
import Navbar from "../Navbar";
import "./Chat.scss";
const Chat = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChats())
      .then((res) => res)
      .catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">
        <FriendList />
        <Messenger />
      </div>
    </div>
  );
};

export default Chat;
