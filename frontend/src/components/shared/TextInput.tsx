import "../../styles/TextInput.css";

type TextInputProps = {
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  required: boolean;
  id: string;
  name: string;
};

type TextAreaInputProps = {
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder: string;
  rows: number;
  required: boolean;
  id: string;
  name: string;
};

export const TextInput = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
}: TextInputProps) => {
  return (
    <div className="input-group">
      <label>{placeholder}</label>
      <input
        id={id}
        name={name}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const TextAreaInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required,
  rows,
}: TextAreaInputProps) => {
  return (
    <div className="input-group">
      <label>{placeholder}</label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
