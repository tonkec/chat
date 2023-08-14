import { Galleria } from 'primereact/galleria';
import './Gallery.scss';

export default function UserGallery({ images }) {
  console.log(images, 'IMAGES');
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

  const itemTemplate = (item) => {
    return (
      <img
        src={`https://duga-user-photo.s3.eu-north-1.amazonaws.com/${item.Key}`}
        alt={item.alt}
        style={{ width: '100%', display: 'block' }}
      />
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
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{ maxWidth: '600px' }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
}
