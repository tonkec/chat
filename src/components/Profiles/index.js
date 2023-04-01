import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/actions/user';
import UserCard from '../UserCard';
import '../Dashboard/Dashboard.scss';

const Profiles = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userReducer.allUsers);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      <h2>Svi profili</h2>
      <div className="user-cards">
        {allUsers.length > 0 &&
          allUsers.map((user) => <UserCard user={user} key={user.id} />)}
      </div>
    </>
  );
};

export default Profiles;
