import { useEffect, useState } from 'react';
import PhotoLikes from './PhotoLikes';
import UpvoteButton from './Upvote';
import DownvoteButton from './Downvote';

const Image = ({ photo, userId }) => {
  const [data, setData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (data.length !== 0) {
      setIsLiked(data.some((object) => object.userId === userId));
    } else {
      setIsLiked(false);
    }
  }, [data, userId]);
  return (
    <>
      <PhotoLikes photo={photo} data={data} setData={setData} />
      <UpvoteButton
        photo={photo}
        userId={userId}
        setData={setData}
        disabled={isLiked}
      />
      <DownvoteButton
        photo={photo}
        userId={userId}
        setData={setData}
        disabled={isLiked}
      />
    </>
  );
};

export default Image;
