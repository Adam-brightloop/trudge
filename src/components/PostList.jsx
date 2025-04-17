import{ useState } from 'react'; // Import useState from React
import Post from './Post';
import NewPost from './NewPost'; // Import the Post component
import Modal from './Modal'; // Import the Modal component
import classes from './PostList.module.css'; // Import the CSS module for styling

function PostList({isPosting, onStopPosting}) {
    const [modalIsVisible, setModalIsVisible] = useState(true); // Initialize state to hold posts' body text
    const [enteredBody, setEnteredBody] = useState(''); // Initialize state to hold body text
    const [enteredAuthor, setEnteredAuthor] = useState(''); // Initialize state to hold author text

    function hideModalHandler() {
        setModalIsVisible(false); // Hide the modal when the button is clicked
    }

    function bodyChangeHandler(event) {
        setEnteredBody(event.target.value); // Update the body variable with the new value from the text area input field.
    }

    function authorChangeHandler(event) {
        setEnteredAuthor(event.target.value); // Update the author variable with the new value from the text area input field.
    }

    return (
        <>
            {isPosting && (
                <Modal onClose={onStopPosting}>
                    <NewPost onBodyChange={bodyChangeHandler} onAuthorChange={authorChangeHandler}/>    
                </Modal>
            )}
                        
            <ul className={classes.posts}>
            <Post author="Adam" body="Master Web Engineer" />
            <Post author={enteredAuthor} body={enteredBody} />
            <Post author="Gracie" body="Little Idiot" />
            </ul>
        </>
        
    );
}

export default PostList;