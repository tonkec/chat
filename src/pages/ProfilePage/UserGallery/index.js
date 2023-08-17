import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import API from '../../../services/api';
import { useSelector } from 'react-redux';
import Flicking from '@egjs/react-flicking';
import { Dialog } from 'primereact/dialog';

import '@egjs/react-flicking/dist/flicking.css';
import './Gallery.scss';

export default function UserGallery({ images }) {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageToBeDeleted, setImageToBeDeleted] = useState(null);
  const currentUser = useSelector((state) => state.userReducer.user);

  const onImageDelete = (item) => {
    API.post(`/uploads/delete-avatar/`, { item, userId: currentUser.id })
      .then((res) => {
        const filteredImages = galleryImages.filter(
          (image) => image.Key !== item.Key
        );
        setGalleryImages(filteredImages);
        setIsModalVisible(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const initialImages = images.length > 0 ? images : [];
    setGalleryImages(initialImages);
  }, [images]);

  return (
    <>
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
                  label="Delete"
                  className="p-button-danger"
                  onClick={() => {
                    setIsModalVisible(true);
                    setImageToBeDeleted(image);
                  }}
                />
              </div>
            </div>
          ))}
      </Flicking>
      <Dialog
        header="Jesi li siguran_na"
        visible={isModalVisible}
        style={{ width: '50vw' }}
        onHide={() => setIsModalVisible(false)}
      >
        <p className="m-0">
          Jesi li siguran_na da želiš obrisati ovu sliku? Radnja se ne može
          poništiti.
        </p>
        {imageToBeDeleted && (
          <Button
            className="p-button-danger"
            label="Delete"
            onClick={() => onImageDelete(imageToBeDeleted)}
            style={{ marginTop: 20 }}
          />
        )}
      </Dialog>
    </>
  );
}
