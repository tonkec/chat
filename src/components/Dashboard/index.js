import { useSelector } from 'react-redux';
import UserCard from '../UserCard';

import './Dashboard.scss';
const Dashboard = () => {
  const currentUser = useSelector((state) => state.authReducer.user);

  return (
    <div className="dashboard">
      <h2>Tvoj Dashboard {currentUser.firstName}</h2>
      <p>Trenutno online korisnici</p>
      <div className="user-cards"></div>
    </div>
  );
};
export default Dashboard;
