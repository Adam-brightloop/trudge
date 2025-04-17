import { useState } from 'react';
import classes from './NewPost.module.css';

function NewPost({onCancel, onAddPost}) {
  const [enteredBody, setEnteredBody] = useState(''); // Initialize state to hold body text
  const [enteredAuthor, setEnteredAuthor] = useState(''); // Initialize state to hold author text
       
  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value); // Update the body variable with the new value from the text area input field.
  }
    
  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value); // Update the author variable with the new value from the text area input field.
  }

  function submitHandler(event) { 
    event.preventDefault(); // Prevent the default form submission behavior
    const postData = {
      body: enteredBody,
      author: enteredAuthor
    };
    console.log(postData); // Log the post data to the console (for debugging purposes)
    onAddPost(postData); // Call the onAddPost function to add the new post
    onCancel(); // Call the onCancel function to close the modal after submission
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler}/>
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={authorChangeHandler}/>
      </p>
      <p className={classes.actions}>
        <button type="submit" className={classes.submit}>Add Post</button>
        <button type="button" className={classes.cancel} onClick={onCancel}>Cancel</button>
      </p>
    </form>
  );
}

export default NewPost;