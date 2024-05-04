import { Dispatch, ReactElement, SetStateAction } from "react";

interface DialogBoxModalProps {
  showModal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

function DialogBoxModal({ showModal, setModal }: DialogBoxModalProps): ReactElement {
  const handleModalClose = () => {
    setModal(false);
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex={-1} style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sub-Breed Details</h5>
            <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Information about the selected sub-breed.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogBoxModal;
