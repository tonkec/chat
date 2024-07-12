import { useEffect, useState } from 'react';
import './UserCard.scss';
import PhotosService from '../../services/photosService';
import UserAvatar from '../UserAvatar/UserAvatar';
const UserCard = ({ user }) => {
  const [avatar, setAvatar] = useState('');
  const firstName = user.firstName ?? 'default nickname';
  useEffect(() => {
    PhotosService.getPhotos(user.id)
      .then(response => {
        if (response.profilePhoto.length > 0) {
          setAvatar(
            `${process.env.REACT_APP_S3_BUCKET_URL}/${response.profilePhoto[0].url}`,
          );
        }
      })
      .catch(e => {
        console.log(e);
      });
  });
  return (
    <div className='user-card' data-testid='user'>
      <UserAvatar avatar={avatar} />
      <p>{firstName}</p>
    </div>
  );
};

export default UserCard;
