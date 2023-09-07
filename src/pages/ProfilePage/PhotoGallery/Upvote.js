import { useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import PhotoLikesService from '../../../services/photolikesService';
import { RealTimeDataTrackerContext } from '../../../context/realTimeDataTrackerContext';

const UpvoteButton = ({ photo, userId }) => {
  const {setLikesCount} = useContext(RealTimeDataTrackerContext);

  return (
    <Button
      icon="pi pi-thumbs-up"
      value="upvote"
      onClick={() => {
        
        PhotoLikesService.like({ userId, uploadId: photo.id })
          .then((res) => console.log(res))
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

export default UpvoteButton;
