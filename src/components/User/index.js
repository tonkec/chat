import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/actions/user';
import './User.scss';

export const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  let { id: userId } = useParams();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);
  return (
    user && (
      <div className="user-wrapper">
        <div className="user">
          <div className="user-name">
            <img src={user.avatar} alt="user avatar" />
            <div>
              <h4>{user.firstName}</h4>
              <p>
                {user.location}, {user.age}
              </p>
            </div>
          </div>

          <div className="user-identity">
            <div>
              <span>{user.sexuality}</span>, <span>{user.gender}</span>
            </div>
          </div>
          <p className="user-bio">
            <b>Bio:</b> <br /> {user.bio}
          </p>
        </div>

        <div>Photo album</div>
      </div>
    )
  );
};

export default User;
