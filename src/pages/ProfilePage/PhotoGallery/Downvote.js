import { useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import PhotoLikesService from '../../../services/photolikesService';
import { RealTimeDataTrackerContext } from '../../../context/realTimeDataTrackerContext';

const DownvoteButton = ({ photo, userId }) => {
  
  const {setLikesCount, likesCount} = useContext(RealTimeDataTrackerContext);
  
  return (
    <Button
      icon="pi pi-thumbs-down"
      value="upvote"
      onClick={() => {
        PhotoLikesService.dislike({ userId, uploadId: photo.id })
          .then((res) => console.log(res.data))
          .catch((e) => console.log(e));
          
          PhotoLikesService.getAllLikes(photo.id)
          .then((res) => {
            console.log(res.data);
            setLikesCount(res.data);
          })
          .catch((e) => console.log(e));
      }}
    />
  );
};

export default DownvoteButton;
