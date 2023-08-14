import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../store/actions/user';
import FlashMessageContext from '../../context/FlashMessage/flashMessageContext';
import API from '../../services/api';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import UserGallery from './UserGallery';

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
      .then((res) => {
        flashMessageContext.success('Image uploaded');
      })
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
      <h1>{currentUser && currentUser.firstName} </h1>
      <UserGallery images={userPhotos} />
      <Card style={{ maxWidth: 600, marginBottom: 30, marginTop: 30 }}>
        <form onSubmit={onAvatarSubmit} encType="multipart/form-data">
          <InputText
            type="file"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <Button type="submit" label="Dodaj sliku" />
        </form>
      </Card>
      <Card style={{ maxWidth: 600, marginBottom: 30 }}>
        <form onSubmit={onUserDataSubmit}>
          <InputText
            type="text"
            style={{ width: '100%', marginBottom: 15 }}
            placeholder="tvoj username"
            defaultValue={currentUser && currentUser.username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputTextarea
            style={{ width: '100%', marginBottom: 15 }}
            placeholder="tvoj bio"
            defaultValue={currentUser && currentUser.bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <InputText
            type="text"
            style={{ width: '100%', marginBottom: 15 }}
            placeholder="tvoja seksualnost"
            defaultValue={currentUser && currentUser.sexuality}
            onChange={(e) => setSexuality(e.target.value)}
          />

          <InputText
            type="text"
            style={{ width: '100%', marginBottom: 15 }}
            placeholder="tvoj rod"
            defaultValue={currentUser && currentUser.gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <InputText
            type="text"
            style={{ width: '100%', marginBottom: 15 }}
            placeholder="Tvoja lokacija"
            defaultValue={currentUser && currentUser.location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <InputText
            type="text"
            style={{ width: '100%', marginBottom: 15 }}
            placeholder="Tvoja dob"
            defaultValue={currentUser && currentUser.age}
            onChange={(e) => setAge(e.target.value)}
          />

          <Button type="submit" label="Izmijeni" />
        </form>
      </Card>
    </>
  );
};
export default ProfilePage;
