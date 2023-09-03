import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/actions/user';
import './User.scss';
import PhotosService from '../../services/photosService';
import PhotoGallery from '../../pages/ProfilePage/PhotoGallery';

export const User = () => {
  const [userPhotos, setUserPhotos] = useState([]);
  const [avatar, setAvatar] = useState('http://placekitten.com/200/200');
  const dispatch = useDispatch();
  const userFromDb = useSelector((state) => state.userReducer.user);
  const { id: paramsId } = useParams();

  useEffect(() => {
    PhotosService.getPhotos(paramsId)
      .then((response) => {
        setUserPhotos(response.allImages);
        setAvatar(
          `${process.env.REACT_APP_S3_BUCKET_URL}/${response.profilePhoto[0].url}`
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, [dispatch, paramsId]);

  useEffect(() => {
    dispatch(getUser(paramsId));
  }, [dispatch, paramsId]);
  return (
    userFromDb && (
      <div className="user-wrapper">
        <div className="user">
          <div className="user-name">
            <img src={avatar} alt="user avatar" />
            <div>
              <h4>{userFromDb.firstName}</h4>
              <p>
                {userFromDb.location}, {userFromDb.age}
              </p>
            </div>
          </div>

          <div className="user-identity">
            <div>
              Sexuality:<span>{userFromDb.sexuality}</span>, Gender:{' '}
              <span>{userFromDb.gender}</span>
            </div>
          </div>
          <p className="user-bio">
            <b>Bio:</b> <br /> {userFromDb.bio}
          </p>
        </div>

        {userPhotos.length > 0 && (
          <div className="user-photos">
            <h3>Fotografije</h3>
            <div className="user-photos-wrapper">
              <PhotoGallery userId={paramsId} images={userPhotos} />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default User;
