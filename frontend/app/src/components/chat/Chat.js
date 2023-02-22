import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../store/actions/auth";
const Chat = () => {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
  };
  return (
    <>
      <h1>Chat</h1>
      {user.email} <img src={user.avatar} alt="kitten" />
      <button onClick={onClick}>Log out</button>
    </>
  );
};

export default Chat;
