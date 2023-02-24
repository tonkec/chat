import { useSelector } from "react-redux";

const Friend = ({ chat }) => {
  const currentChat = useSelector((state) => state.chatReducer.currentChat);
  const isChatOpened = () => {
    return currentChat.id === chat.id ? "opened" : "";
  };

  const lastMessage = () => {
    if (chat.Messages.length === 0) return "";

    const message = chat.Messages[chat.Messages.length - 1];
    return message.type === "image" ? "image" : message.message;
  };
  return (
    <div className={isChatOpened()}>
      <img width="40" height={40} src={chat.Users[0].avatar} alt="avatar" />{" "}
      {chat.Users[0].firstName} {chat.Users[0].lastName} <p>{lastMessage()}</p>
    </div>
  );
};

export default Friend;
