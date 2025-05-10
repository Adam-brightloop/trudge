import { useNavigate } from 'react-router-dom';
import classes from './Modal.module.css'; // Import the CSS module for styling

function Modal({children}) {
  const navigate = useNavigate();
  function closeHandler() {
    // Close the modal and navigate back to the previous page
    navigate(-1);
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;