import "./MessageBox.scss";
import Message from "../Message";
import { useSelector } from "react-redux";
const MessageBox = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div id="msg-box">
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
