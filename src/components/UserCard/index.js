import './UserCard.scss';
const UserCard = ({ user }) => {
  const avatar = user.avatar
    ? `http://placekitten.com/200/300`
    : `http://placekitten.com/200/600`;

  const firstName = user.firstName ?? 'default nickname';

  return (
    <div className="user-card" data-testid="user">
      <img src={avatar} alt="user avatar" />
      <p>{firstName}</p>
    </div>
  );
};

export default UserCard;
