import { Button } from 'primereact/button';
import PhotoLikesService from '../../../services/photolikesService';

const UpvoteButton = ({ photo, userId, setData, disabled }) => {
  return (
    <Button
      icon="pi pi-thumbs-up"
      value="upvote"
      disabled={disabled}
      onClick={() => {
        PhotoLikesService.like({ userId, uploadId: photo.id })
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

export default UpvoteButton;
