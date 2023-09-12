import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import followersService from '../../services/followersService';
import { useSelector } from 'react-redux';
import NumberOfFollowers from '../NumberOfFollowers';

const FollowButton = ({ userId }) => {
  const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false);
  const [followers, setFollowers] = useState([]);
  const currentUser = useSelector(state => state.authReducer.user);

  const onFollowUser = () => {
    followersService
      .addFollower(currentUser, userId)
      .then(response => {
        setIsAlreadyFollowed(true);
        setFollowers([...followers, response.follower]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onUnfollowUser = () => {
    followersService
      .removeFollower(currentUser.id, userId)
      .then(response => {
        setIsAlreadyFollowed(false);
        setFollowers(
          followers.filter(follower => follower.userId !== currentUser.id),
        );
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    followersService
      .getFollowers(userId)
      .then(response => {
        setFollowers(response.followers);
        const isAlreadyFollowed = response.followers.some(
          follower => follower.userId === currentUser.id,
        );

        setIsAlreadyFollowed(isAlreadyFollowed);
      })
      .catch(e => {
        console.log(e);
      });
  }, [userId, currentUser]);

  return (
    <>
      <Button
        severity='info'
        label={isAlreadyFollowed ? 'Unfollow' : 'Follow'}
        onClick={() => {
          if (isAlreadyFollowed) {
            onUnfollowUser();
          } else {
            onFollowUser();
          }
        }}
      ></Button>
      <NumberOfFollowers followers={followers} />
    </>
  );
};

export default FollowButton;
