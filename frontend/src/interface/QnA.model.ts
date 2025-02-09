export interface CRUDProps {
  isEdit: boolean;
  selectedId?: string;
  handleClose?: () => void;
};

export interface QnAList {
  _id: string;
  question: string;
  answer: string;
  category: string;
  subcategory: string;
}

export interface Options {
  value: string;
  title: string;
}

export interface ModalProps {
  id: string;
  type: string;
}

