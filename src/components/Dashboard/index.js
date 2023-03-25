import { useSelector, useDispatch } from 'react-redux';
import DashobardCard from './DashboardCard';
import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { setOnlineUsers } from './../../store/actions/user';
import { setSocket } from '../../store/actions/chat';
import './Dashboard.scss';
const Dashboard = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const currentUser = useSelector((state) => state.authReducer.user);
  const onlineUsers = useSelector((state) => state.userReducer.onlineUsers);
  const isCurrentUserOnline = JSON.parse(
    localStorage.getItem('online') || false
  );
  const shouldConnectToSocket = isLoggedIn && currentUser;
  useEffect(() => {
    if (shouldConnectToSocket) {
      const socket = socketIOClient.connect(process.env.REACT_APP_BACKEND_PORT);
      isCurrentUserOnline && socket.emit('login', currentUser);
      socket.on('get-users', (users) => dispatch(setOnlineUsers(users)));
      dispatch(setSocket(socket));
    }
  }, [
    isLoggedIn,
    currentUser,
    shouldConnectToSocket,
    dispatch,
    isCurrentUserOnline,
  ]);
  return (
    <div className="dashboard">
      <h2>Tvoj Dashboard {currentUser.firstName}</h2>
      <p>Trenutno online korisnici</p>
      <div className="dashboard-cards">
        {onlineUsers.length > 0 &&
          onlineUsers.map(({ user }) => (
            <DashobardCard key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
};
export default Dashboard;
