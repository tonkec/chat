import { useSelector } from 'react-redux';
import UserCard from '../UserCard';

import './Dashboard.scss';
const Dashboard = () => {
  const currentUser = useSelector((state) => state.authReducer.user);
  const onlineUsers = useSelector((state) => state.userReducer.onlineUsers);
  console.log(onlineUsers, 'all online users');
  return (
    <div className="dashboard">
      <h2>Tvoj Dashboard {currentUser.firstName}</h2>
      <p>Trenutno online korisnici</p>
      <div className="user-cards">
        {onlineUsers &&
          onlineUsers.length > 0 &&
          onlineUsers.map(({ user }) => {})}
      </div>
    </div>
  );
};
export default Dashboard;
