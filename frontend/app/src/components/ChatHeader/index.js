import { useState } from "react";
import { userStatus } from "../../utlis/helpers";

const ChatHeader = ({ chat }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <>
      <div id="chatter">
        {chat.Users.map((user) => {
          return (
            <div className="chatter-info" key={user.id}>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div className="chatter-status">
                <span className={`online-status ${userStatus(user)}`}></span>
              </div>
            </div>
          );
        })}
      </div>
      <div onClick={() => setShowOptions(!showOptions)}>options</div>

      {showOptions && (
        <>
          <button>Add new user</button>
          {chat.type === "group" && <button>Leave chat</button>}
          <button>Delete chat</button>
        </>
      )}
    </>
  );
};

export default ChatHeader;
