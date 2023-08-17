import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store/actions/user';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const ProfilePageForm = ({ onSubmit }) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authReducer.user);
  const currentUser = useSelector((state) => state.userReducer.user);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const [sexuality, setSexuality] = useState(currentUser.sexuality);
  const [gender, setGender] = useState(currentUser.gender);
  const [location, setLocation] = useState(currentUser.location);
  const [age, setAge] = useState(currentUser.age);

  const onUserDataSubmit = (e) => {
    console.log(authUser, 'authUser');
    console.log('currentUser', currentUser);
    e.preventDefault();
    const data = { username, bio, gender, sexuality, location, age };
    console.log(data);

    dispatch(updateUser(data));
    onSubmit();
  };

  return (
    <form onSubmit={onUserDataSubmit}>
      <label htmlFor="username">Username</label>
      <InputText
        type="text"
        style={{ width: '100%', marginBottom: 15 }}
        placeholder="tvoj username"
        defaultValue={currentUser && currentUser.username}
        onChange={(e) => setUsername(e.target.value)}
        id="username"
      />

      <label htmlFor="bio">Bio</label>
      <InputTextarea
        style={{ width: '100%', marginBottom: 15 }}
        placeholder="tvoj bio"
        defaultValue={currentUser && currentUser.bio}
        onChange={(e) => setBio(e.target.value)}
        id="bio"
      />

      <label htmlFor="sexuality">Seksualnost</label>
      <InputText
        type="text"
        style={{ width: '100%', marginBottom: 15 }}
        placeholder="tvoja seksualnost"
        defaultValue={currentUser && currentUser.sexuality}
        onChange={(e) => setSexuality(e.target.value)}
        id="sexuality"
      />

      <label htmlFor="gender">Rod</label>
      <InputText
        type="text"
        style={{ width: '100%', marginBottom: 15 }}
        placeholder="tvoj rod"
        defaultValue={currentUser && currentUser.gender}
        onChange={(e) => setGender(e.target.value)}
        id="gender"
      />

      <label htmlFor="location">Lokacija</label>
      <InputText
        type="text"
        style={{ width: '100%', marginBottom: 15 }}
        placeholder="Tvoja lokacija"
        defaultValue={currentUser && currentUser.location}
        onChange={(e) => setLocation(e.target.value)}
        id="location"
      />

      <label htmlFor="age">Dob</label>
      <InputText
        type="text"
        style={{ width: '100%', marginBottom: 15 }}
        placeholder="Tvoja dob"
        defaultValue={currentUser && currentUser.age}
        onChange={(e) => setAge(e.target.value)}
        id="age"
      />

      <Button type="submit" label="Izmijeni" />
    </form>
  );
};

export default ProfilePageForm;
