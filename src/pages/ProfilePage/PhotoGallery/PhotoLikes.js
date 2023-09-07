import { useEffect, useState, useContext } from 'react';
import PhotoLikesService from '../../../services/photolikesService';
import { RealTimeDataTrackerContext } from '../../../context/realTimeDataTrackerContext';

const PhotoLikes = ({ photo }) => {

  const {likesCount, setLikesCount} = useContext(RealTimeDataTrackerContext);
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
