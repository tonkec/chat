import { useEffect, useState } from 'react';
import PhotoLikes from './PhotoLikes';
import UpvoteButton from './Upvote';
import DownvoteButton from './Downvote';

const Image = ({ photo, userId, currentUserId }) => {
  const [data, setData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (data.length !== 0) {
      setIsLiked(data.some((object) => object.userId === currentUserId.id));
    } else {
      setIsLiked(false);
    }
  }, [data, currentUserId]);
  return (
    <>
      <PhotoLikes photo={photo} data={data} setData={setData} />
      <UpvoteButton
        photo={photo}
        userId={currentUserId.id}
        setData={setData}
        disabled={isLiked}
      />
      <DownvoteButton
        photo={photo}
        userId={currentUserId.id}
        setData={setData}
        disabled={isLiked}
      />
    </>
  );
};

export default Image;
