import { Button } from 'primereact/button';
import PhotoLikesService from '../../../services/photolikesService';

const DownvoteButton = ({ photo, userId, setData, disabled }) => {
  return (
    <Button
      icon="pi pi-thumbs-down"
      value="upvote"
      disabled={!disabled}
      onClick={() => {
        PhotoLikesService.dislike({ userId, uploadId: photo.id })
          .then((res) =>
            PhotoLikesService.getAllLikes(photo.id)
              .then((res) => {
                setData(res.data);
              })
              .catch((e) => e)
          )
          .catch((e) => e);
      }}
    />
  );
};

export default DownvoteButton;
