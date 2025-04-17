import classes from './Modal.module.css'; // Import the CSS module for styling

function Modal({children}){
    return (
        <>
          <div className={classes.backdrop} />
          <dialog open className={classes.modal}>
            {children}
          </dialog>
        </>
                
    );
}
export default Modal;