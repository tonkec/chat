import { Dialog } from "primereact/dialog";
import DataSubmitter from "../DataSubmitter";

const MultipleUploadPhotoModal = ({ isOpen, onHide, fetchUserPhotos }) => {
  return (
    <Dialog
      visible={isOpen}
      onHide={onHide}
      style={{ width: "70vw", height: "70vh" }}
    >
      <DataSubmitter fetchUserPhotos={fetchUserPhotos} onHide={onHide} />
    </Dialog>
  );
};

export default MultipleUploadPhotoModal;
