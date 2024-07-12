import './UserAvatar.scss';

const UserAvatar = ({ avatar }) => {
  if (avatar) {
    return (
      <div>
        <img src={avatar} alt='user avatar' />
      </div>
    );
  }
  return (
    <div className='profile-photo'>
      <span className='pi pi-user'></span>
    </div>
  );
};

export default UserAvatar;
