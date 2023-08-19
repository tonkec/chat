import { FileUpload } from 'primereact/fileupload';
const ProfilePhoto = ({ profilePhotoUrl, onUpload }) => {
  return profilePhotoUrl.trim() === '' ? (
    <div className=" col-12 md:col-4">
      <div
        className="avatar col-12 md:col-4"
        style={{
          backgroundImage: `url(http://placekitten.com/g/200/300)`,
        }}
      ></div>
      <FileUpload
        mode="basic"
        accept="image/*"
        name="profilePhoto"
        customUpload
        uploadHandler={onUpload}
        style={{ marginTop: 20 }}
      />
    </div>
  ) : (
    <div className=" col-12 md:col-4">
      <div
        className="avatar"
        style={{
          backgroundImage: `url(https://duga-user-photo.s3.eu-north-1.amazonaws.com/${profilePhotoUrl})`,
        }}
      ></div>
      <FileUpload
        mode="basic"
        accept="image/*"
        name="profilePhoto"
        customUpload
        uploadHandler={onUpload}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default ProfilePhoto;
