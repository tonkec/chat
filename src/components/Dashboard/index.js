import { useSelector } from 'react-redux';
import DashobardCard from './DashboardCard';
import './Dashboard.scss';
const Dashboard = () => {
  const onlineUsers = useSelector((state) => state.userReducer.onlineUsers);
  console.log(onlineUsers);
  return (
    <div className="dashboard">
      <h2>Tvoj Dashboard</h2>
      <p>Trenutno online korisnici</p>
      <div className="dashboard-cards">
        {onlineUsers &&
          onlineUsers.map(({ user }) => (
            <DashobardCard key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
};
export default Dashboard;
