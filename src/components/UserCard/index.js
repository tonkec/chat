import './UserCard.scss';
const UserCard = ({ user }) => (
  <div className="user-card" data-testid="user">
    <img src={user.avatar} alt="user avatar" />
    <p>{user.firstName}</p>
  </div>
);

export default UserCard;
