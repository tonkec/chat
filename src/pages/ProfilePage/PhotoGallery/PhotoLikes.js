import { useEffect, useState } from 'react';
import PhotoLikesService from '../../../services/photolikesService';

const PhotoLikes = ({ photo }) => {
  const [likesCount, setLikesCount] = useState([]);
  useEffect(() => {
    PhotoLikesService.getAllLikes(photo.id)
      .then((res) => {
        console.log(res.data);
        setLikesCount(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return <p>{likesCount.length} lajkova</p>;
};

export default PhotoLikes;
