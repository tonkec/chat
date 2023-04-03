import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/actions/user';

export const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  let { id: userId } = useParams();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);
  return (
    <>
      <h1>{user && user.firstName} profil</h1>
    </>
  );
};

export default User;
