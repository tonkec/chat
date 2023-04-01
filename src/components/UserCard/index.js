import './UserCard.scss';
const DashobardCard = ({ user }) => (
  <div className="user-card">
    <img src={user.avatar} alt="user avatar" />
    <p>{user.firstName}</p>
  </div>
);

export default DashobardCard;
