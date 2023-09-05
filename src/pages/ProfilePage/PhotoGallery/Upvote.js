import { useEffect } from 'react';
import { Button } from 'primereact/button';
import PhotoLikesService from '../../../services/photolikesService';

const UpvoteButton = ({ photo, userId }) => {
  return (
    <Button
      icon="pi pi-thumbs-up"
      value="upvote"
      onClick={() => {
        PhotoLikesService.like({ userId, uploadId: photo.id })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      }}
    />
  );
};

export default UpvoteButton;
