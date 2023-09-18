import "./Message.scss";

const Message = ({ user, chat, index, message }) => {
  const determineMargin = () => {
    if (index + 1 === chat.Messages.length) {
      return "m-0";
    }
    return message.fromUserId === chat.Messages[index + 1].fromUserId
      ? "mb-5"
      : "mb-10";
  };
  return (
    <div
      className={`message ${determineMargin()} ${
        message.fromUserId === user.id ? "creator" : ""
      }`}
    >
      {message.fromUserId !== user.id && (
        <img
          src={message.User.avatar}
          alt='user-avatar'
          className='user-avatar'
        />
      )}
      <div
        className={message.fromUserId === user.id ? "owner" : "other-person"}
      >
        {message.fromUserId !== user.id ? (
          <>
            <h6 className="m-0">
              {message.User.firstName} {message.User.lastName}{" "}
            </h6>
          </>
        ) : null}
        {message.type === "text" ? (
          <p>{message.message}</p>
        ) : (
          <img src={message.message} alt='user upload' />
        )}
      </div>{" "}
    </div>
  );
};

export default Message;
