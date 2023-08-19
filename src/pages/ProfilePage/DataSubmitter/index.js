import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import API from '../../../services/api';
import { useSelector } from 'react-redux';
import { chooseOptions, uploadOptions, cancelOptions } from './options';
import HeaderTemplate from './HeaderTemplate';
import EmptyTemplate from './EmptyTemplate';
import ItemTemplate from './ItemTemplate';

export default function DataSubmitter({ onHide, fetchUserPhotos }) {
  const currentUser = useSelector((state) => state.userReducer.user);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const [text, setText] = useState([]);
  const [totalSize, setTotalSize] = useState(0);

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
  };

  const prepareData = (e) => {
    const invalidDescriptions = text.filter((item) => {
      if (
        item.description === '' ||
        item.description === null ||
        item.description.length > 150
      ) {
        return item;
      }

      return false;
    });

    if (invalidDescriptions.length > 0 || text.length === 0) {
      toast.current.show({
        severity: 'error',
        summary: 'Greška',
        detail: 'Opis slike mora imati izmedju 1 i 150 karaktera.',
      });
      return;
    }

    saveImagesToS3(e);
  };

  const saveImagesToS3 = (e) => {
    const formData = new FormData();
    e.files.map((file) => {
      return formData.append('avatar', file);
    });
    formData.append('userId', currentUser.id);
    formData.append('text', JSON.stringify(text));

    API.post(`/uploads/avatar`, formData, {})
      .then((res) => {
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'File Uploaded',
        });
        setText([]);
        fileUploadRef.current.clear();
        setTimeout(() => {
          onHide();
          fetchUserPhotos();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const onDescriptionChange = (e, file) => {
    setText((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex((item) => item.imageId === file.name);

      if (index === -1) {
        newState.push({ imageId: file.name, description: e.target.value });
      } else {
        newState[index].description = e.target.value;
      }

      return newState;
    });
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        maxFileSize={1000000}
        multiple
        customUpload
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={(options) => (
          <HeaderTemplate
            options={options}
            fileUploadRef={fileUploadRef}
            totalSize={totalSize}
          />
        )}
        itemTemplate={(file, options) => (
          <ItemTemplate
            file={file}
            options={options}
            onTemplateRemove={onTemplateRemove}
            onDescriptionChange={onDescriptionChange}
          />
        )}
        emptyTemplate={() => <EmptyTemplate />}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        uploadHandler={prepareData}
      />
    </div>
  );
}
