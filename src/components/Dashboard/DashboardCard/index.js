import './DashboardCard.scss';
const DashobardCard = ({ user }) => (
  <div className="dashboard-card" key={user.id}>
    {user.firstName}
  </div>
);

export default DashobardCard;
