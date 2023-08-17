import { Dialog } from 'primereact/dialog';
import DataSubmitter from '../DataSubmitter';

const UploadPhotoModal = ({ isOpen, onHide, onClose }) => {
  return (
    <Dialog
      visible={isOpen}
      onHide={onHide}
      style={{ width: '70vw', height: '70vh' }}
    >
      <DataSubmitter />
    </Dialog>
  );
};

export default UploadPhotoModal;
