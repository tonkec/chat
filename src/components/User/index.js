import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/actions/user';
import './User.scss';
import PhotosService from '../../services/photosService';
import PhotoGallery from '../../pages/ProfilePage/PhotoGallery';
import FollowButton from '../FollowButton';
import UserAvatar from '../UserAvatar/UserAvatar';

export const User = () => {
  const [userPhotos, setUserPhotos] = useState([]);
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();
  const userFromDb = useSelector(state => state.userReducer.user);
  const { id: paramsId } = useParams();

  useEffect(() => {
    PhotosService.getPhotos(paramsId)
      .then(response => {
        setUserPhotos(response.allImages);
        if (response.profilePhoto.length > 0) {
          setAvatar(
            `${process.env.REACT_APP_S3_BUCKET_URL}/${response.profilePhoto[0].url}`,
          );
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [dispatch, paramsId]);

  useEffect(() => {
    dispatch(getUser(paramsId));
  }, [dispatch, paramsId]);

  if (!userFromDb) {
    return <div>Loading...</div>;
  }

  const { sexuality, gender, bio, location, age, firstName } = userFromDb;

  const shouldShowUserIdentityBox = sexuality || gender;
  const shouldShowLocationOrAge = location || age;

  return (
    userFromDb && (
      <div className='user-wrapper'>
        <div className='user'>
          <FollowButton userId={paramsId} />
          <div className='user-name'>
            <UserAvatar avatar={avatar} />
            <div>
              <h4>{firstName}</h4>
              {shouldShowLocationOrAge && (
                <p>
                  {location && <span>{location}</span>}
                  {age && <span>{age}</span>}
                </p>
              )}
            </div>
          </div>
          {shouldShowUserIdentityBox && (
            <div className='user-identity'>
              <div>
                {sexuality && <p>Sexuality: {sexuality}</p>}
                {gender && <p>Gender: {gender}</p>}
              </div>
            </div>
          )}
          {bio && <p>{bio}</p>}
        </div>

        {userPhotos.length > 0 && (
          <div className='user-photos'>
            <h3>Fotografije</h3>
            <div className='user-photos-wrapper'>
              <PhotoGallery userId={paramsId} images={userPhotos} />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default User;
