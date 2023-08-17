import './Gallery.scss';
import { Button } from 'primereact/button';
import API from '../../../services/api';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';

export default function UserGallery({ images }) {
  const [galleryImages, setGalleryImages] = useState([]);
  const currentUser = useSelector((state) => state.userReducer.user);

  const onImageDelete = (item) => {
    API.post(`/uploads/delete-avatar/`, { item, userId: currentUser.id })
      .then((res) => {
        const filteredImages = galleryImages.filter(
          (image) => image.Key !== item.Key
        );
        setGalleryImages(filteredImages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const initialImages = images.length > 0 ? images : [];
    setGalleryImages(initialImages);
  }, [images]);

  return (
    <Flicking renderOnlyVisible={true}>
      {galleryImages.length > 0 &&
        galleryImages.map((image, index) => (
          <div className="flicking-panel" key={index}>
            <div className="gallery-image-container">
              <img
                src={`https://duga-user-photo.s3.eu-north-1.amazonaws.com/${image.Key}`}
                alt="user gallery"
                style={{ width: '100%' }}
              />
              <Button
                className="p-button-danger"
                label="Delete"
                onClick={() => onImageDelete(image)}
              />
            </div>
          </div>
        ))}
    </Flicking>
  );
}
