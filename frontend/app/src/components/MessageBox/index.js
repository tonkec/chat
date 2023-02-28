import { useEffect, useRef } from "react";
import "./MessageBox.scss";
import Message from "../Message";
import { useSelector } from "react-redux";
const MessageBox = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);
  const msgBox = useRef();

  useEffect(() => {
    setTimeout(() => {
      scrollManual(msgBox.current.scrollHeight);
    }, 100);
  }, [scrollBottom]);
  const scrollManual = (value) => {
    msgBox.current.scrollTop = value;
  };
  return (
    <div id="msg-box" ref={msgBox}>
      {chat.Messages.map((message, index) => (
        <Message
          user={user}
          chat={chat}
          message={message}
          index={index}
          key={message.id}
        />
      ))}
    </div>
  );
};

export default MessageBox;
