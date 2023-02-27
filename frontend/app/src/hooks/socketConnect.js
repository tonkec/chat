import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  onlineFriends,
  onlineFriend,
  offlineFriend,
  fetchChats,
} from "../store/actions/chat";

function useSocket(dispatch, user) {
  useEffect(() => {
    dispatch(fetchChats())
      .then((res) => {
        const socket = socketIOClient.connect("http://127.0.0.1:4000");

        socket.emit("join", user);
        socket.on("typing", (user) => {
          console.log("Event", user);
        });

        socket.on("friends", (friends) => {
          console.log("Friends", friends);
          dispatch(onlineFriends(friends));
        });

        socket.on("online", (user) => {
          console.log("Online", user);
          dispatch(onlineFriend(user));
        });

        socket.on("offline", (user) => {
          console.log("Offline", user);
          dispatch(offlineFriend(user));
        });
        console.log(res);
      })
      .catch((err) => err);
  }, [dispatch, user]);
}

export default useSocket;
