import { Dialog } from "primereact/dialog";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ProgressSpinner } from "primereact/progressspinner";
import "./ViewImageModal.scss";

const ViewImageModal = ({ isOpen, onHide, image }) => {
  return (
    image && (
      <Dialog
        visible={isOpen}
        onHide={onHide}
        style={{ width: "30vw", height: "70vh" }}
      >
        <LazyLoadImage
          src={`https://duga-user-photo.s3.eu-north-1.amazonaws.com/${image.url}`}
          alt={image.description}
          placeholder={
            <div>
              <ProgressSpinner />
            </div>
          }
          style={{ width: "25vw", margin: "0 auto", display: "block" }}
        />

        <p style={{ margin: "0 auto", textAlign: "center" }}>
          {image.description}
        </p>
      </Dialog>
    )
  );
};

export default ViewImageModal;
