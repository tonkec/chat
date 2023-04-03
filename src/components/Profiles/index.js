import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/actions/user';
import UserCard from '../UserCard';
import '../Dashboard/Dashboard.scss';
import { Link } from 'react-router-dom';
import './Profiles.scss';
const Profiles = () => {
  const dispatch = useDispatch();
  const usersFromStore = useSelector((state) => state.userReducer.allUsers);
  const [users, setUsers] = useState(usersFromStore);

  const filterUsers = (e) => {
    const filterBy = e.target.value;
    const filteredUsers = usersFromStore.filter((user) => {
      return (
        user.firstName.includes(filterBy) ||
        user.lastName.includes(filterBy) ||
        (user.gender && user.gender.includes(filterBy)) ||
        (user.sexuality && user.sexuality.includes(filterBy))
      );
    });

    setUsers(filteredUsers);
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="all-profiles">
      <h2>Svi profili</h2>
      <input
        type="text"
        placeholder="Pretraži korisnike..."
        onChange={filterUsers}
      />
      <div className="user-cards">
        {users.length > 0 &&
          users.map((user) => {
            return (
              <Link key={user.id} to={`/user/${user.id}`}>
                <UserCard user={user} key={user.id} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Profiles;
