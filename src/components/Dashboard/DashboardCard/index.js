import './DashboardCard.scss';
const DashobardCard = ({ user }) => (
  <div className="dashboard-card" key={user.id}>
    <img src={user.avatar} alt="user avatar" />
    <p>{user.firstName}</p>
  </div>
);

export default DashobardCard;
