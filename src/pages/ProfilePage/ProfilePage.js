import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/actions/user';
const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authReducer.user);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [sexaulity, setSexuality] = useState('');
  const [gender, setGender] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { username, bio, gender, sexaulity };
    dispatch(updateUser(data));
  };
  return (
    <>
      <h1>
        {currentUser.firstName} {currentUser.lastName}
      </h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="tvoj username"
          defaultValue={currentUser.username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="tvoj bio"
          defaultValue={currentUser.bio || ''}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="tvoja seksualnost"
          defaultValue={currentUser.sexuality || ''}
          onChange={(e) => setSexuality(e.target.value)}
        />
        <input
          type="text"
          placeholder="tvoj rod"
          defaultValue={currentUser.gender || ''}
          onChange={(e) => setGender(e.target.value)}
        />
        <button> Izmijeni </button>
      </form>
    </>
  );
};
export default ProfilePage;
