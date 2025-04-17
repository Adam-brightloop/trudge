import classes from './Modal.module.css'; // Import the CSS module for styling

function Modal({children, onClose}) {
    return (
        <>
          <div className={classes.backdrop} onClick={onClose} />
          <dialog open className={classes.modal}>
            {children}
          </dialog>
        </>
                
    );
}
export default Modal;