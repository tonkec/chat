import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

const ItemTemplate = ({
  file,
  options,
  onTemplateRemove,
  onDescriptionChange,
  errObj,
}) => {
  return (
    <div className="flex align-items-center flex-wrap">
      <div className="flex align-items-center" style={{ width: "40%" }}>
        <img
          alt={file.name}
          role="presentation"
          src={file.objectURL}
          width={100}
        />
        <span className="flex flex-column text-left ml-3">
          {file.name}
          <small>{new Date().toLocaleDateString()}</small>
        </span>
      </div>
      <Tag
        value={options.formatSize}
        severity="warning"
        className="px-3 py-2"
      />
      <InputText
        placeholder="Opis slike"
        style={{ marginLeft: 20 }}
        onChange={(e) => onDescriptionChange(e, file)}
        required
      />
      {errObj.err && <Message severity="error" text={errObj.errText} />}
      <Button
        type="button"
        icon="pi pi-times"
        className="p-button-outlined p-button-rounded p-button-danger ml-auto"
        onClick={() => onTemplateRemove(file, options.onRemove)}
      />
    </div>
  );
};

export default ItemTemplate;
