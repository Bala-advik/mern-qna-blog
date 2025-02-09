import DOMPurify from "dompurify";
import { QnAList } from "../interface/QnA.model";
import { LoaderIcon } from "../components/svg/LoaderIcon";
import EditIcon from "../components/svg/EditIcon";
import DeleteIcon from "../components/svg/DeleteIcon";

type Props = {
  qna: QnAList[];
  handleModalOpen: Function;
  isLoading: boolean;
  refreshCount: number;
};

const QnABlogCards = ({
  qna,
  handleModalOpen,
  isLoading,
}: Props) => {

  return !isLoading ? (
    <section className="card-section">
      {qna &&
        qna.length > 0 &&
        qna?.map((qnaItem: QnAList) => {          
          return (
            <div
              key={qnaItem._id}
              className={`card-container`}
            >
              <div className="question-title">
                <h3>{qnaItem.question}</h3>
                <div className="d-flex">
                  <button
                    onClick={() =>
                      handleModalOpen({ id: qnaItem._id, type: "edit" })
                    }
                    className="edit-btn"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() =>
                      handleModalOpen({ id: qnaItem._id, type: "delete" })
                    }
                    className="delete-btn"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              <article>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(qnaItem.answer),
                  }}
                />
              </article>
            </div>
          );
        })}
    </section>
  ) : (
    <LoaderIcon />
  );
};

export default QnABlogCards;
