import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../store/actions/user';
import FlashMessageContext from '../../context/FlashMessage/flashMessageContext';
import API from '../../services/api';
const ProfilePage = () => {
  const flashMessageContext = useContext(FlashMessageContext);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authReducer.user);
  const currentUser = useSelector((state) => state.userReducer.user);
  const [username, setUsername] = useState(authUser.username);
  const [bio, setBio] = useState(authUser.bio);
  const [sexuality, setSexuality] = useState(authUser.sexuality);
  const [gender, setGender] = useState(authUser.gender);
  const [location, setLocation] = useState(authUser.location);
  const [age, setAge] = useState(authUser.age);
  const [avatar, setAvatar] = useState(authUser.avatar);
  const [userPhotos, setUserPhotos] = useState([]);

  const onAvatarSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('userId', currentUser.id);

    API.post(`/uploads/avatar`, formData, {})
      .then((res) => flashMessageContext.success('Image uploaded'))
      .catch((err) => {
        console.log(err);
        flashMessageContext.error('Image upload failed');
      });
  };

  const onUserDataSubmit = (e) => {
    e.preventDefault();
    const data = { username, bio, gender, sexuality, location, age };
    dispatch(updateUser(data));
  };

  useEffect(() => {
    API.get(`/uploads/avatar/${authUser.id}`)
      .then((res) => {
        setUserPhotos(res.data.Contents);
      })
      .catch((err) => {
        console.log(err);
        flashMessageContext.error('Failed to get user photos');
      });
  }, [authUser.id, flashMessageContext]);

  useEffect(() => {
    dispatch(getUser(authUser.id));
  }, [dispatch, authUser]);

  return (
    <>
      <h1>
        {currentUser && currentUser.firstName}{' '}
        {currentUser && currentUser.lastName}
      </h1>
      {userPhotos && userPhotos.length > 0 ? (
        userPhotos.map((photo) => (
          <img
            key={photo.Key}
            src={`https://duga-user-photo.s3.eu-north-1.amazonaws.com/${photo.Key}`}
            alt="user"
            width={200}
          />
        ))
      ) : (
        <p>No photos</p>
      )}

      <form onSubmit={onAvatarSubmit} encType="multipart/form-data">
        <input
          type="file"
          name="avatar"
          onChange={(e) => setAvatar(e.target.files[0])}
        />{' '}
        <input type="submit" value="Upload image" />
      </form>
      <form onSubmit={onUserDataSubmit}>
        Tvoj avatar
        <input
          type="text"
          placeholder="tvoj username"
          defaultValue={currentUser && currentUser.username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="tvoj bio"
          defaultValue={currentUser && currentUser.bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="tvoja seksualnost"
          defaultValue={currentUser && currentUser.sexuality}
          onChange={(e) => setSexuality(e.target.value)}
        />
        <input
          type="text"
          placeholder="tvoj rod"
          defaultValue={currentUser && currentUser.gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tvoja lokacija"
          defaultValue={currentUser && currentUser.location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tvoja dob"
          defaultValue={currentUser && currentUser.age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit"> Izmijeni </button>
      </form>
    </>
  );
};
export default ProfilePage;
