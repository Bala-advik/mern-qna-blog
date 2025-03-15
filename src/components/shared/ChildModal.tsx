import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

interface IModalProps {
  canShow: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}

const ChildModal = ({
  canShow,
  children,
  handleClose
}: IModalProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(canShow);
  }, [canShow]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default ChildModal;
