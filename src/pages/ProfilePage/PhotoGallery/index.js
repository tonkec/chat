import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import API from '../../../services/api';
import { useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import ViewImageModal from '../ViewImageModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import './PhotoGallery.scss';

export default function PhotoGallery({ images }) {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  const currentUser = useSelector((state) => state.userReducer.user);

  const onImageDelete = (item) => {
    API.post(`/uploads/delete-avatar/`, { item, userId: currentUser.id })
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
      {galleryImages.length > 0 && (
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={2}
          navigation
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide key={index} style={{ position: 'relative' }}>
              <img
                src={`https://duga-user-photo.s3.eu-north-1.amazonaws.com/${image.url}`}
                alt={image.description}
                style={{ width: '100%' }}
                onClick={() => {
                  setCurrentImage(image);
                  setIsImageModalVisible(true);
                }}
              />

              <p style={{ marginBottom: 20 }}>{image.description}</p>
              <Button
                style={{ position: 'absolute', top: 0, right: 0 }}
                label="Delete"
                className="p-button-danger"
                onClick={() => {
                  setIsWarningModalVisible(true);
                  setCurrentImage(image);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
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
