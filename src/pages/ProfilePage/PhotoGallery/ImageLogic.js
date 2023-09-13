import { useEffect, useContext, useState } from "react";
import PhotoLikes from "./PhotoLikes";
import UpvoteButton from "./Upvote";
import DownvoteButton from "./Downvote";

const ImageLogic = ({ photo, userId }) => {
  const [data, setData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (data.length !== 0) {
      setIsLiked(data.some((object) => object.userId === userId));
    } else {
      setIsLiked(false);
    }
  }, [data]);
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

export default ImageLogic;
