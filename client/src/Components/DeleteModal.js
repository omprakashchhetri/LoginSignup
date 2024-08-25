export default function Modal({ CloseModal, onDelete }) {
  const handleDelete = () => {
    // Calling the onDelete function to initiate the delete action
    onDelete();
    // Calling the modal
    CloseModal();
  };

  return (
    <>
      <div className="modal-wrapper" onClick={CloseModal}></div>
      <div className="modal-container d-flex justify-content-center align-items-center  rounded-5">
        <div className="p1">
          <h2 className="modal-head">Delete this Record?</h2>
          <hr />
          <p className="modal-subhead ">This action cannot be reversed.</p>
          <div className=" d-flex justify-content-center ">
            <button className="btn btn-light p-2 px-4 m-1" onClick={CloseModal}>
              Cancle
            </button>
            <button className="btn btn-danger px-4 m-1" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
