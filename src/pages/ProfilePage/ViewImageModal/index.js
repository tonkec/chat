import { Dialog } from 'primereact/dialog';
import './ViewImageModal.scss';

const ViewImageModal = ({ isOpen, onHide, image }) => {
  return (
    image && (
      <Dialog
        visible={isOpen}
        onHide={onHide}
        style={{ width: '70vw', height: '70vh' }}
      >
        <div
          className="background-image"
          style={{
            backgroundImage: `url(https://duga-user-photo.s3.eu-north-1.amazonaws.com/${image.url})`,
          }}
        >
          {' '}
          <p
            style={{
              margin: 0,
              backgroundColor: '#fff',
              color: '#000',
              padding: '10px 20px',
            }}
          >
            {image.description}
          </p>
        </div>
      </Dialog>
    )
  );
};

export default ViewImageModal;
