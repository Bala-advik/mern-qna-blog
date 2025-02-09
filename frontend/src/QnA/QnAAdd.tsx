import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import { TextAreaInput } from "../components/shared/TextInput";
import InputContainer from "../components/shared/InputContainer";
import "../styles/QnA.css";
import { SelectInput } from "../components/shared/SelectInput";
const ReactQuill = lazy(() => import("react-quill"));
import "react-quill/dist/quill.snow.css";
import { optionsList, quillFormats, quillModules } from "../constants/qnaconst";
import { CRUDProps, QnAList } from "../interface/QnA.model";
import { LoaderIcon } from "../components/svg/LoaderIcon";
import { useDispatch } from "react-redux";
import { updateQnARedux } from "../redux/slices/qnaslice";

const QnAAdd = ({
  isEdit,
  selectedId,
}: CRUDProps) => {
  const dispatch = useDispatch<any>();
  const [qna, setQnA] = useState<QnAList[]>([]);
  const initFormValues = {
    answer: "",
    question: "",
    category: "react",
    subcategory: "basic",
  };
  const [formValues, setFormValues] = useState(initFormValues);
  const [quillAnswer, setQuillAnswer] = useState("");

  useEffect(() => {
    const fetchQnAById = async (selectedId: string) => {
      const { answer, question, category, subcategory } = await axios
        .get(`${import.meta.env.VITE_API_URL}/qna/${selectedId}`)
        .then((response) => response.data[0]);
      setFormValues({ answer, question, category, subcategory });
      setQuillAnswer(answer);
    };

    if (selectedId && isEdit) {
      fetchQnAById(selectedId);
    }
  }, [isEdit]);

  const updateFormValues = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const addQnA = async (e: any) => {
    e.preventDefault();
    await axios
      .post(`${import.meta.env.VITE_API_URL}/qna`, {
        ...formValues,
        answer: quillAnswer,
      })
      .then((response) => setQnA([...qna, response.data]))
      .finally(() => {
        setQuillAnswer("");
        setFormValues(initFormValues);
      });
  };

  const editQna = async (e: any) => {
    e.preventDefault();
    let formData = {
      ...formValues,
      answer: quillAnswer,
    };
    dispatch(updateQnARedux({ id: selectedId || "", formValues: formData }));
  };

  return (
    <Suspense fallback={<LoaderIcon />}>
      <div className="qna-container">
        <InputContainer>

          <TextAreaInput
            id="question"
            name="question"
            type="text"
            rows={1}
            value={formValues.question}
            onChange={updateFormValues}
            placeholder="Question"
            required={true}
          />

          <div className="input-group">
            <label>Answer</label>
            <ReactQuill
              theme="snow"
              value={quillAnswer}
              onChange={setQuillAnswer}
              modules={quillModules}
              formats={quillFormats}
            />
          </div>

          <SelectInput
            id="category"
            name="category"
            optionsArray={optionsList}
            labelText="Category"
            value={formValues.category}
            onChange={updateFormValues}
            required={true}
          />

          <SelectInput
            id="subcategory"
            name="subcategory"
            optionsArray={[
              { value: "basic", title: "Basic" },
              { value: "advanced", title: "Advanced" },
            ]}
            labelText="Sub Category"
            value={formValues.subcategory}
            onChange={updateFormValues}
            required={true}
          />
          
          <button
            type="submit"
            className="add-button"
            onClick={isEdit ? editQna : addQnA}
          >
            {`${isEdit ? "Update" : "Add"} QnA`}
          </button>
        </InputContainer>
      </div>
    </Suspense>
  );
};

export default QnAAdd;
