import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import API from '../../../services/api';
import { useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import ViewImageModal from '../ViewImageModal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ProgressSpinner } from 'primereact/progressspinner';

import './PhotoGallery.scss';

export default function PhotoGallery({ images, userId }) {
  const [galleryImages, setGalleryImages] = useState(images);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  const userFromDb = useSelector((state) => state.userReducer.user);
  const loggedInUser = useSelector((state) => state.authReducer.user);
  const isEditable = loggedInUser.id === parseInt(userId);

  const onImageDelete = (item) => {
    API.post(`/uploads/delete-avatar/`, { item, userId: userFromDb.id })
      .then((res) => {
        const filteredImages = galleryImages.filter(
          (image) => image.url !== item.url
        );

        setGalleryImages(filteredImages);
        setIsWarningModalVisible(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const initialImages = images.length > 0 ? images : [];
    setGalleryImages(initialImages);
  }, [images]);

  return (
    <>
      <div className="grid">
        {galleryImages.length > 0 &&
          galleryImages.map((image) => (
            <div
              className="col-12 lg:col-6"
              key={image.url}
              style={{ padding: 0 }}
            >
              <div className="card">
                <div className="card-image">
                  <LazyLoadImage
                    src={`${process.env.REACT_APP_S3_BUCKET_URL}/${image.url}`}
                    alt={image.description}
                    placeholder={
                      <div>
                        <ProgressSpinner />
                      </div>
                    }
                    style={{ width: '100%', height: '100%' }}
                    onClick={() => {
                      setCurrentImage(image);
                      setIsImageModalVisible(true);
                    }}
                  />
                </div>
                <div className="card-content">
                  <p>{image.description}</p>
                </div>
                <div className="card-actions">
                  {isEditable && (
                    <Button
                      icon="pi pi-trash"
                      className="p-button-danger"
                      onClick={() => {
                        setCurrentImage(image);
                        setIsWarningModalVisible(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <Dialog
        header="Jesi li siguran_na"
        visible={isWarningModalVisible}
        style={{ width: '50vw' }}
        onHide={() => setIsWarningModalVisible(false)}
      >
        <p className="m-0">
          Jesi li siguran_na da želiš obrisati ovu sliku? Radnja se ne može
          poništiti.
        </p>
        {currentImage && (
          <Button
            className="p-button-danger"
            label="Delete"
            onClick={() => onImageDelete(currentImage)}
            style={{ marginTop: 20 }}
          />
        )}
      </Dialog>
      <ViewImageModal
        isOpen={isImageModalVisible}
        onHide={() => setIsImageModalVisible(false)}
        image={currentImage}
      />
    </>
  );
}
