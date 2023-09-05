import { useEffect } from 'react';
import { Button } from 'primereact/button';
import PhotoLikesService from '../../../services/photolikesService';

const DownvoteButton = ({ photo, userId }) => {
  return (
    <Button
      icon="pi pi-thumbs-down"
      value="upvote"
      onClick={() => {
        PhotoLikesService.dislike({ userId, uploadId: photo.id })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      }}
    />
  );
};

export default DownvoteButton;
