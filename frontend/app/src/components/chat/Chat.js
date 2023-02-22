import React from "react";
import { useSelector } from "react-redux";
const Chat = () => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <>
      <h1>Chat</h1>
      {user.email}
    </>
  );
};

export default Chat;
