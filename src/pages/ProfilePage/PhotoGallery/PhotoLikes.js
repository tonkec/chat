import { useEffect, useState } from 'react';
import PhotoLikesService from '../../../services/photolikesService';

const PhotoLikes = ({ photo }) => {
  const [likesCount, setLikesCount] = useState(0);
  useEffect(() => {
    PhotoLikesService.getAllLikes(photo.id)
      .then((res) => {
        setLikesCount(res.data);
        console.log(res);
      })
      .catch((e) => console.log(e));
  }, []);
  return <p>{likesCount} lajkova</p>;
};

export default PhotoLikes;
