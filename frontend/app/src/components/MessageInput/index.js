import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ChatService from "../../services/chatService";

import "./MessageInput.scss";
const MessageInput = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const fileUpload = useRef();
  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);

    // notify other users that this user is typing something
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") {
      sendMessage(imageUpload);
    }
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message,
    };

    setMessage("");
    setImage("");
    // send message with socket
    socket.emit("message", msg);
  };
  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("id", chat.id);
    formData.append("image", image);
    ChatService.uploadImage(formData)
      .then((image) => {
        sendMessage(image);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div id="input-container">
      <div id="message-input">
        <div id="image-upload-container">
          <div></div>
          <div id="image-upload">
            {image.name ? (
              <div id="image-details" className="m-0">
                <p>{image.name}</p>
                <button onClick={handleImageUpload}>Upload</button>
                <button onClick={() => setImage("")}>Remove</button>
              </div>
            ) : null}

            <button onClick={() => fileUpload.current.click()}>Upload</button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Message...."
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
          value={message}
        />
      </div>

      <input
        type="file"
        id="chat-image"
        ref={fileUpload}
        onChange={(e) => setImage(e.target.files[0])}
      />
    </div>
  );
};

export default MessageInput;
