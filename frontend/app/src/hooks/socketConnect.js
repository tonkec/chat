import { useEffect } from "react";

import socketIOClient from "socket.io-client";

function useSocket(dispatch, user) {
  useEffect(() => {
    const socket = socketIOClient.connect("http://127.0.0.1:4000");

    socket.emit("join", user);
  }, [dispatch, user]);
}

export default useSocket;
