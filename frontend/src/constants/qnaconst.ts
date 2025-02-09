import { Options } from "../interface/QnA.model";

export const optionsList: Options[] = [
  { value: "react", title: "React" },
  { value: "css", title: "CSS" },
  { value: "js", title: "JS" },
  { value: "ts", title: "TS" },
  { value: "nodeJS", title: "Node JS" },
  { value: "jwt", title: "JWT" },
  { value: "html", title: "HTML" },
  { value: "redux", title: "Redux" },
  { value: "hrqna", title: "HR Questions" },
  { value: "machineCode", title: "Machine Code" },
];

export const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["code-block"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "code-block",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];
