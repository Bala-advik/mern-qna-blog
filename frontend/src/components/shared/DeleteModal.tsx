import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface IModalProps {
  canShow: boolean;
  handleSave: React.MouseEventHandler<HTMLButtonElement>;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteModal = ({ canShow, handleSave, handleClose }: IModalProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(canShow);
  }, [canShow]);

  return (
    <>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this item ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
