import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/actions/user';
import './User.scss';
import PhotosService from '../../services/photosService';

export const User = () => {
  const [userPhotos, setUserPhotos] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const { id: userId } = useParams();

  useEffect(() => {
    PhotosService.getPhotos(userId)
      .then((response) => {
        setUserPhotos(response.allImages);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);
  return (
    user && (
      <div className="user-wrapper">
        <div className="user">
          <div className="user-name">
            <img src={user.avatar} alt="user avatar" />
            <div>
              <h4>{user.firstName}</h4>
              <p>
                {user.location}, {user.age}
              </p>
            </div>
          </div>

          <div className="user-identity">
            <div>
              <span>{user.sexuality}</span>, <span>{user.gender}</span>
            </div>
          </div>
          <p className="user-bio">
            <b>Bio:</b> <br /> {user.bio}
          </p>
        </div>

        {userPhotos.length > 0 && (
          <div className="user-photos">
            <h3>Fotografije</h3>
            <div className="user-photos-wrapper">
              {userPhotos.map((photo) => (
                <img
                  key={photo.id}
                  src={`${process.env.REACT_APP_S3_BUCKET_URL}/${photo.url}`}
                  alt="user photo"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default User;
