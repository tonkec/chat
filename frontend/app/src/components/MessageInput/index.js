import { useState } from "react";
import { useSelector } from "react-redux";
import "./MessageInput.scss";
const MessageInput = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);

    // notify other user that this user is typing
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") {
      sendMessage(imageUpload);
    }
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) {
      return;
    }

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUserId: user.id,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? image : message,
    };

    setMessage("");
    setImage("");

    // send msg with sockets
  };
  return (
    <div id="input-container">
      <div id="message-input">
        <input
          type="text"
          placeholder="Message...."
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
      </div>
    </div>
  );
};

export default MessageInput;
