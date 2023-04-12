import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../store/actions/user';
const ProfilePage = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authReducer.user);
  const currentUser = useSelector((state) => state.userReducer.user);
  const [username, setUsername] = useState(authUser.username);
  const [bio, setBio] = useState(authUser.bio);
  const [sexuality, setSexuality] = useState(authUser.sexuality);
  const [gender, setGender] = useState(authUser.gender);
  const [location, setLocation] = useState(authUser.location);
  const [age, setAge] = useState(authUser.age);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { username, bio, gender, sexuality, location, age };
    dispatch(updateUser(data));
  };

  useEffect(() => {
    dispatch(getUser(authUser.id));
  }, [dispatch, authUser]);

  return (
    <>
      <h1>
        {currentUser && currentUser.firstName}{' '}
        {currentUser && currentUser.lastName}
      </h1>
      <form onSubmit={onSubmit}>
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
        <button> Izmijeni </button>
      </form>
    </>
  );
};
export default ProfilePage;
