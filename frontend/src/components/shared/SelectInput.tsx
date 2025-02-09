import "../../styles/TextInput.css";

interface OptionsArrayProp {
  value: string;
  title: string;
}

interface SelectInputProps {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  optionsArray: OptionsArrayProp[];
  labelText: string;
  id: string;
  name: string;
  required: boolean;
}

export const SelectInput = ({
  id,
  name,
  onChange,
  optionsArray,
  labelText,
  required,
  value
}: SelectInputProps) => {
  return (
    <div className="input-group">
      <label>{labelText}</label>
      <select id={id} name={name} onChange={onChange} required={required} value={value}>
        {optionsArray.map((optionArrayItem) => (
          <option key={optionArrayItem.value} value={optionArrayItem.value}>
            {optionArrayItem.title}
          </option>
        ))}
      </select>
    </div>
  );
};
