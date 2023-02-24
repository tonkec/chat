import { useSelector, useDispatch } from "react-redux";
import Friend from "../Friend";
const FriendList = () => {
  const chats = useSelector((state) => state.chatReducer.chats);
  return (
    <div>
      <h3>Friends</h3>
      <button> Add new friend to chat with</button>
      <hr />

      {chats.length > 0 ? (
        chats.map((chat) => {
          return <Friend chat={chat} key={chat.id} />;
        })
      ) : (
        <h1>No chats</h1>
      )}
    </div>
  );
};

export default FriendList;
