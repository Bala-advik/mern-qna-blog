import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/QnA/QnA.css";
import { Button, Form } from "react-bootstrap";
import ChildModal from "../components/shared/ChildModal";
import QnAAdd from "./QnAAdd";
import QnABlogCards from "./QnABlogCards";
import DeleteModal from "../components/shared/DeleteModal";
import { ModalProps } from "../interface/QnA.model";
import { optionsList } from "../constants/qnaconst";
import { fetchQnA } from "../service/qnaCalls";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  fetchQnARedux,
  resetModalsClose,
  resetSearch,
  searchItems,
  setDeleteModalOpen,
  setEditModalOpen,
} from "../redux/slices/qnaslice";
import { TextAreaInput } from "../components/shared/TextInput";
import { useNavigate } from "react-router-dom";

const QnA: React.FC = () => {
  const dispatch = useDispatch<any>();
  const {
    loading,
    filteredList,
    isEditModalOpen,
    isDeleteModalOpen,
    refreshCount,
  } = useSelector((state: RootState) => state.qna);

  const { isUserLoggedIn } = useSelector((state: RootState) => state.user);
  const [selectedId, setSelectedId] = useState("");
  const [searchInputVal, setSearchInputVal] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn]);

  const handleClose = () => {
    dispatch(resetModalsClose());
  };

  const handleDelete = async () => {
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/qna/${selectedId}`)
      .then(() => fetchQnA(selectedOption))
      .catch((err) => console.log(err))
      .finally(() => handleClose());
  };

  const handleModalOpen = ({ id, type }: ModalProps) => {
    setSelectedId(id);
    type === "edit"
      ? dispatch(setEditModalOpen())
      : dispatch(setDeleteModalOpen());
  };

  const handleSearch = (e: any) => {
    setSearchInputVal(e.target.value);
    if (e.target.value.trim()) {
      dispatch(searchItems(e.target.value)); // Dispatch search action
    } else {
      dispatch(resetSearch()); // Reset if input is empty
    }
  };

  return (
    <div className="qna-blog-container">
      <section className="select-section">
        <TextAreaInput
          id="search-input"
          name="searchInput"
          type="text"
          rows={1}
          value={searchInputVal}
          onChange={handleSearch}
          placeholder="Search"
          required={true}
        />

        <div className="search-actions">
          <Form.Select
            defaultValue={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="" selected disabled hidden>
              Choose
            </option>
            {optionsList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            ))}
          </Form.Select>
          <Button onClick={() => dispatch(fetchQnARedux(selectedOption))}>
            Search
          </Button>
        </div>
      </section>

      <QnABlogCards
        qna={filteredList}
        isLoading={loading}
        handleModalOpen={handleModalOpen}
        refreshCount={refreshCount}
      />

      <DeleteModal
        canShow={isDeleteModalOpen}
        handleSave={handleDelete}
        handleClose={handleClose}
      />

      <ChildModal canShow={isEditModalOpen} handleClose={handleClose}>
        <QnAAdd
          isEdit={true}
          selectedId={selectedId}
          handleClose={handleClose}
        />
      </ChildModal>
    </div>
  );
};

export default QnA;
