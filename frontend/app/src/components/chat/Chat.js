import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../store/actions/chat";
import Messenger from "../Messenger";
import FriendList from "../FriendList";
import Navbar from "../Navbar";
import "./Chat.scss";
import useSocket from "../../hooks/socketConnect";
const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  useSocket(dispatch, user);
  // useEffect(() => {
  //   dispatch(fetchChats())
  //     .then((res) => res)
  //     .catch((e) => console.log(e));
  // }, [dispatch]);

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
