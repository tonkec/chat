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
      <div className="user">
        <img src={user.avatar} alt="user avatar" />
        <h1>{user.firstName}</h1>
      </div>
    )
  );
};

export default User;
