import { useEffect, useState, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/actions/user';
import API from '../../services/api';
import PhotoGallery from './PhotoGallery';
import { Button } from 'primereact/button';
import ProfilePageForm from './ProfilePageForm/';
import MultipleUploadPhotoModal from './MultipleUploadPhotoModal';
import './ProfilePage.scss';
import ProfilePhoto from './ProfilePhoto';
import { Message } from 'primereact/message';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authReducer.user);
  const currentUser = useSelector((state) => state.userReducer.user);
  const [userPhotos, setUserPhotos] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [isNewUploadModalVisible, setIsNewUploadModalVisible] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [errStatus, setErrStatus] = useState({
    err: false,
    errText: '',
  });
  const [successStatus, setSuccessStatus] = useState({
    succses: false,
    succsessText: '',
  });
  const fetchUserPhotos = useCallback(async () => {
    try {
      const response = await API.get(`/uploads/avatar/${authUser.id}`);
      const withoutProfilePhoto = response.data.images.filter(
        (image) => image.isProfilePhoto !== true
      );
      const profilePhoto = response.data.images.filter(
        (image) => image.isProfilePhoto === true
      );

      if (profilePhoto.length > 0) {
        setProfilePhotoUrl(profilePhoto[0].url);
      }
      setUserPhotos(withoutProfilePhoto);
    } catch (error) {
      console.log(error);
    }
  }, [authUser.id]);

  const onUploadProfilePhoto = async (e) => {
    const file = e.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('userId', authUser.id);
    formData.append('isProfilePhoto', true);

    try {
      const response = await API.post('/uploads/profile-photo', formData, {});

     
      if (response.status === 200) {
        setSuccessStatus({
          succses: true,
          succsessText: 'Fotografija uspjesno dodata'
        })
        fetchUserPhotos();
      }

      if (response.status !== 200) {
        setErrStatus({err: true, errText: 'Doslo je do greske?!'})
      }

      e.files = [];
    } catch (error) {
      setErrStatus({err: true, errText: 'Doslo je do greske?!'})
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserPhotos();
  }, [authUser.id, errStatus, successStatus, fetchUserPhotos]);

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
                  {errStatus.err && <Message severity='error' text={errStatus.errText} style={{width: '100%'}}/>}
                <div className="grid">
                  <ProfilePhoto
                    profilePhotoUrl={profilePhotoUrl}
                    onUpload={onUploadProfilePhoto}
                  />

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
                </>
              )}
            </div>
            <div className="sm:col-8 lg:col-6">
              <div className="card" style={{ padding: 0 }}>
                {successStatus.succses && <Message severity='success' text={successStatus.succsessText} />}
                <PhotoGallery images={userPhotos} />
                {errStatus.err && <Message severity='error' text={errStatus.errText} />}
                <Button
                  style={{ marginTop: 20 }}
                  label="Dodaj novu fotku"
                  onClick={() => {
                    if (userPhotos.length >= 5) {
                      setErrStatus({err: true, errText: 'Maksimalan broj fotki je 5'})
                      return;
                    }
                    setIsNewUploadModalVisible(true);

                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {isNewUploadModalVisible && (
        <>

        <MultipleUploadPhotoModal
          isOpen={isNewUploadModalVisible}
          onHide={() => {setIsNewUploadModalVisible(false)}}
          fetchUserPhotos={fetchUserPhotos}
        />
        
        </>
      )}
    </>
  );
};
export default ProfilePage;
