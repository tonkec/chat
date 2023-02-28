import { useEffect, useRef } from "react";
import "./MessageBox.scss";
import Message from "../Message";
import { useSelector } from "react-redux";
const MessageBox = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);
  const senderTyping = useSelector((state) => state.chatReducer.senderTyping);

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
      {senderTyping.typing && senderTyping.chatId === chat.id ? (
        <div className="message">
          <div className="other-person">
            <p>
              {senderTyping.fromUser.firstName}
              {senderTyping.fromUser.lasttName}...
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MessageBox;
