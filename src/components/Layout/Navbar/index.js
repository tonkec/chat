import { useEffect } from "react";
import "./Navbar.scss";
import Dropdown from "../../Dropdown";
import { useSelector, useDispatch } from "react-redux";
import useSocket from "../../../hooks/socketConnect";

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const currentUser = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);
  useSocket(dispatch, currentUser);
  const isCurrentUserOnline = JSON.parse(
    localStorage.getItem("online") || false,
  );

  const shouldConnectToSocket = isLoggedIn && currentUser;

  const onOnline = () => {
    localStorage.setItem("online", true);
    socket.emit("has-gone-online", currentUser);
  };

  const onOffline = () => {
    localStorage.setItem("online", false);
    socket.emit("has-gone-offline", currentUser);
  };

  useEffect(() => {
    if (shouldConnectToSocket) {
      if (!isEmpty(socket)) {
        if (isCurrentUserOnline) {
          socket.emit("has-gone-online", currentUser);
        } else {
          socket.emit("has-gone-offline", currentUser);
        }
      }
    }
  }, [
    dispatch,
    shouldConnectToSocket,
    currentUser,
    isCurrentUserOnline,
    socket,
  ]);

  return (
    <nav className="navbar">
      <Dropdown onOfflineClick={onOffline} onOnlineClick={onOnline} />
    </nav>
  );
};

export default Navbar;
