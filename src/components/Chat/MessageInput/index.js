import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatService from '../../../services/chatService';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { incrementScroll } from '../../../store/actions/chat';
import { HiPaperClip } from 'react-icons/hi';
import './MessageInput.scss';
const MessageInput = ({ chat }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);
  const newMessage = useSelector((state) => state.chatReducer.newMessage);

  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showNewMessageNotification, setShowNewMessageNotification] =
    useState(false);

  const fileUpload = useRef();
  const msgInput = useRef();
  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);
    const receiver = {
      chatId: chat.id,
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
    };

    if (value.length === 1) {
      receiver.typing = true;
      socket.emit('typing', receiver);
    }

    if (value.length === 0) {
      receiver.typing = false;
      socket.emit('typing', receiver);
    }
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === 'Enter') {
      sendMessage(imageUpload);
    }
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) {
      return;
    }

    const msg = {
      type: imageUpload ? 'image' : 'text',
      fromUser: user,
      toUserId: chat.Users && chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message,
    };

    setMessage('');
    setImage('');
    setShowEmojiPicker(false);
    // send message with socket
    socket.emit('message', msg);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('id', chat.id);
    formData.append('image', image);
    ChatService.uploadImage(formData)
      .then((image) => {
        sendMessage(image);
      })
      .catch((e) => console.log(e));
  };

  const selectEmoji = (emoji) => {
    const startPosition = msgInput.current.selectionStart;
    const endPosition = msgInput.current.selectionEnd;
    const emojiLength = emoji.native.length;
    const value = msgInput.current.value;
    setMessage(
      value.substring(0, startPosition) +
        emoji.native +
        value.substring(endPosition, value.length)
    );
    msgInput.current.focus();
    msgInput.current.selectionEnd = endPosition + emojiLength;
  };

  useEffect(() => {
    const msgBox = document.getElementById('msg-box');
    const isSeen = newMessage.seen;
    const isCurrentChat = newMessage.chatId === chat.id;
    const messageBoxHeight = msgBox.scrollHeight !== msgBox.clientHeight;
    const isScrolled = msgBox.scrollTop > msgBox.scrollHeight * 0.3;

    if (!isSeen && isCurrentChat && messageBoxHeight) {
      if (isScrolled) {
        dispatch(incrementScroll());
      } else {
        setShowNewMessageNotification(true);
      }
    } else {
      setShowNewMessageNotification(false);
    }
  }, [newMessage, dispatch, chat.id]);

  const showNewMessage = () => {
    dispatch(incrementScroll());
    setShowNewMessageNotification(false);
  };

  return (
    <div className="input-container">
      <div className="message-input">
        <div className="image-upload-container">
          <div>
            {showNewMessageNotification ? (
              <div className="message-notification" onClick={showNewMessage}>
                <p>Bell</p>
                <p className="m-0">new message</p>
              </div>
            ) : null}
          </div>
          <div className="image-upload">
            {image.name ? (
              <div className="m-0 image-details">
                <p>{image.name}</p>
                <button onClick={handleImageUpload}>Upload</button>
                <button onClick={() => setImage('')}>Remove</button>
              </div>
            ) : null}

            <button
              className="button-inline-block button-file"
              onClick={() => fileUpload.current.click()}
            >
              <HiPaperClip />
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Message...."
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
          value={message}
          ref={msgInput}
        />
        <button
          className="button-inline-block button-emoji"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          🙂
        </button>
      </div>

      <input
        type="file"
        id="chat-image"
        ref={fileUpload}
        onChange={(e) => setImage(e.target.files[0])}
      />

      {showEmojiPicker ? (
        <Picker
          data={data}
          title="Pick your emoji..."
          emoji="point_up"
          style={{ position: 'absolute', bottom: '20px', right: '0px' }}
          onEmojiSelect={selectEmoji}
        />
      ) : null}
    </div>
  );
};

export default MessageInput;
