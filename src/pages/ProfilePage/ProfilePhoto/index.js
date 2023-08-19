import { FileUpload } from 'primereact/fileupload';
const ProfilePhoto = ({ profilePhotoUrl, onUpload }) => {
  return profilePhotoUrl.trim() === '' ? (
    <div
      className="avatar col-12 md:col-4"
      style={{
        backgroundImage: `url(http://placekitten.com/g/200/300)`,
      }}
    >
      <FileUpload
        mode="basic"
        accept="image/*"
        name="profilePhoto"
        customUpload
        uploadHandler={onUpload}
      />
    </div>
  ) : (
    <div
      className="avatar col-12 md:col-4"
      style={{
        backgroundImage: `url(https://duga-user-photo.s3.eu-north-1.amazonaws.com/${profilePhotoUrl})`,
      }}
    >
      <FileUpload
        mode="basic"
        accept="image/*"
        name="profilePhoto"
        customUpload
        uploadHandler={onUpload}
      />
    </div>
  );
};

export default ProfilePhoto;
