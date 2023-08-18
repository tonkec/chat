import { ProgressBar } from 'primereact/progressbar';
const HeaderTemplate = ({ options, totalSize, fileUploadRef }) => {
  const { className, chooseButton, uploadButton, cancelButton } = options;
  const value = totalSize / 10000;
  const formatedValue =
    fileUploadRef && fileUploadRef.current
      ? fileUploadRef.current.formatSize(totalSize)
      : '0 B';

  return (
    <div
      className={className}
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {chooseButton}
      {uploadButton}
      {cancelButton}
      <div className="flex align-items-center gap-3 ml-auto">
        <span>{formatedValue} / 1 MB</span>
        <ProgressBar
          value={value}
          showValue={false}
          style={{ width: '10rem', height: '12px' }}
        ></ProgressBar>
      </div>
    </div>
  );
};

export default HeaderTemplate;
