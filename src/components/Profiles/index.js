import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/actions/user';
import UserCard from '../UserCard';
import '../Dashboard/Dashboard.scss';
import { Link } from 'react-router-dom';

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
          allUsers.map((user) => {
            return (
              <Link key={user.id} to={`/user/${user.id}`}>
                <UserCard user={user} key={user.id} />
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Profiles;
