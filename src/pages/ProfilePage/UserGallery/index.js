import { Galleria } from 'primereact/galleria';
import './Gallery.scss';
import { Button } from 'primereact/button';
import API from '../../../services/api';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function UserGallery({ images }) {
  const [galleryImages, setGalleryImages] = useState([]);
  const currentUser = useSelector((state) => state.userReducer.user);
  const responsiveOptions = [
    {
      breakpoint: '991px',
      numVisible: 4,
    },
    {
      breakpoint: '767px',
      numVisible: 3,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  const onImageDelete = (item) => {
    API.post(`/uploads/delete-avatar/`, { item, userId: currentUser.id })
      .then((res) => {
        setGalleryImages(
          galleryImages.filter((image) => image.Key !== item.Key)
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const initialImages = images.length > 0 ? images : [];
    setGalleryImages(initialImages);
  }, [images]);

  const itemTemplate = (item) => {
    return (
      <div className="item-template">
        <img
          src={`https://duga-user-photo.s3.eu-north-1.amazonaws.com/${item.Key}`}
          alt={item.alt}
          style={{ maxWidth: '100%' }}
        />
        <Button label="Delete" onClick={() => onImageDelete(item)} />
      </div>
    );
  };

  const thumbnailTemplate = (item) => {
    // add string thumbnail after the last slash in Key
    const thumbnail = item.Key.substring(
      0,
      item.Key.lastIndexOf('/') + 1
    ).concat('thumbnail-', item.Key.substring(item.Key.lastIndexOf('/') + 1));

    return (
      <img
        src={`https://duga-user-photo.s3.eu-north-1.amazonaws.com/${thumbnail}`}
        alt={item.alt}
        width={'100%'}
      />
    );
  };

  return (
    <div className="card">
      {galleryImages.length > 0 ? (
        <Galleria
          value={galleryImages}
          responsiveOptions={responsiveOptions}
          numVisible={5}
          style={{ maxWidth: '600px' }}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
        />
      ) : (
        <p>Nemaš slika</p>
      )}
    </div>
  );
}
