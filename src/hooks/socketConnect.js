import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  onlineFriends,
  onlineFriend,
  offlineFriend,
  fetchChats,
  setSocket,
  receivedMessage,
  senderTyping,
  createChat,
  addUserToGroup,
  leaveCurrentChat,
  deleteCurrentChat,
} from "../store/actions/chat";
import { setOnlineUsers } from "../store/actions/user";

function useSocket(dispatch, user) {
  useEffect(() => {
    const socket = socketIOClient.connect(process.env.REACT_APP_BACKEND_PORT);
    socket.on("save-users-to-store", (users) => {
      dispatch(setOnlineUsers(users));
    });
    dispatch(fetchChats())
      .then((res) => {
        dispatch(setSocket(socket));
        socket.emit("join", user);
        socket.on("typing", (sender) => {
          console.log("Typing", sender);
          dispatch(senderTyping(sender));
        });

        socket.on("friends", (friends) => {
          console.log("Friends", friends);
          dispatch(onlineFriends(friends));
        });

        socket.on("online", (user) => {
          console.log("Online Friend", user);
          dispatch(onlineFriend(user));
        });

        socket.on("offline", (user) => {
          console.log("Offline", user);
          dispatch(offlineFriend(user));
        });

        socket.on("received", (message) => {
          dispatch(receivedMessage(message, user.id));
        });

        socket.on("new-chat", (chat) => {
          dispatch(createChat(chat));
        });

        socket.on("added-user-to-group", (group) => {
          dispatch(addUserToGroup(group));
        });

        socket.on("remove-user-from-chat", (data) => {
          data.currentUserId = user.id;
          dispatch(leaveCurrentChat(data));
        });

        socket.on("delete-chat", (chatId) => {
          dispatch(deleteCurrentChat(chatId));
        });

        // console.log(res);
      })
      .catch((err) => err);
  }, [dispatch, user]);
}

export default useSocket;
