import "../../styles/Components/InputContainer.css";

interface Props {
  children: React.ReactNode;
}

export const InputContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="form-container">
      <form className="form">{children}</form>
    </div>
  );
};

export default InputContainer;
