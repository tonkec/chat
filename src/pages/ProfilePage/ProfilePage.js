import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/actions/user';
import FlashMessageContext from '../../context/FlashMessage/flashMessageContext';
import API from '../../services/api';
import UserGallery from './UserGallery';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';

import './ProfilePage.scss';
import ProfilePageForm from './ProfilePageForm/';

const ProfilePage = () => {
  const flashMessageContext = useContext(FlashMessageContext);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authReducer.user);
  const currentUser = useSelector((state) => state.userReducer.user);
  const [userPhotos, setUserPhotos] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  const onAvatarSubmit = (e) => {
    const formData = new FormData();
    formData.append('avatar', e.files[0]);
    formData.append('userId', currentUser.id);

    API.post(`/uploads/avatar`, formData, {})
      .then((res) => {
        e.options.clear();
        flashMessageContext.success('Image uploaded');
      })
      .catch((err) => {
        console.log(err);
        flashMessageContext.error('Image upload failed');
      });
  };

  useEffect(() => {
    API.get(`/uploads/avatar/${authUser.id}`)
      .then((res) => {
        const filteredData = res.data.filter((item) => {
          if (item.Key.includes('thumbnail')) {
            return false;
          }
          return item;
        });

        setUserPhotos(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authUser.id, flashMessageContext]);

  useEffect(() => {
    dispatch(getUser(authUser.id));
  }, [dispatch, authUser]);

  return (
    <>
      {currentUser && (
        <div className="profile">
          <div className="grid" style={{ marginBottom: 50 }}>
            <div className="col-6 col-offset-6 flex justify-content-end">
              <Button
                severity="info"
                label="Izmijeni"
                onClick={() => setIsEditable(!isEditable)}
              ></Button>
            </div>
          </div>
          <div className="grid">
            <div className="sm:col-8 lg:col-6">
              <div className="card">
                <div className="grid">
                  <div
                    className="avatar col-12 md:col-4"
                    style={{ backgroundImage: `url(${currentUser.avatar})` }}
                  ></div>

                  <div className="md:col-8">
                    <h3 style={{ marginLeft: 20 }}>
                      {currentUser.firstName} {currentUser.lastName}
                    </h3>
                    <p style={{ marginLeft: 20 }}>
                      {currentUser.age} {currentUser.sexuality}{' '}
                      {currentUser.gender} {currentUser.location}
                    </p>
                  </div>
                </div>
              </div>

              {isEditable ? (
                <div className="card">
                  <ProfilePageForm
                    onSubmit={() => setIsEditable(!isEditable)}
                  />
                </div>
              ) : (
                <>
                  <div className="card">
                    <h4>About me</h4>
                    {currentUser.bio}
                  </div>

                  <div className="card">
                    <h4>Interests</h4>
                  </div>
                </>
              )}
            </div>
            <div className="sm:col-8 lg:col-6">
              <div className="card flex flex-column align-items-end">
                <UserGallery images={userPhotos} />

                <FileUpload
                  name="avatar"
                  customUpload
                  chooseLabel="Dodaj sliku"
                  mode="basic"
                  uploadHandler={onAvatarSubmit}
                  style={{ marginTop: 20 }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfilePage;
