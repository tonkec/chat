import { useSelector } from 'react-redux';
import DashobardCard from './DashboardCard';

const Dashboard = () => {
  const onlineUsers = useSelector((state) => state.userReducer.onlineUsers);
  console.log(onlineUsers);
  return (
    <>
      <h2>Tvoj Dashboard</h2>
      {onlineUsers &&
        onlineUsers.map(({ user }) => (
          <DashobardCard key={user.id} user={user} />
        ))}
    </>
  );
};
export default Dashboard;
