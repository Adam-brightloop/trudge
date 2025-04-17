import { useState } from 'react';
import classes from './NewPost.module.css';

function NewPost() {
  /*const stateData = useState('');
  stateData[0];  This is the state variable that holds the value of the text area input field.
  stateData[1];  This is the function to update the state variable.   
  let enteredBody = '';*/
  const [enteredBody, setEnteredBody] = useState(''); // Using array destructuring to get the state variable and the function to update it.
    
  // This function handles the change event for the text area input field.    
  function changeBodyHandler(event) {
    setEnteredBody(event.target.value); // Update the state variable with the new value from the text area input field.
  }

  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={changeBodyHandler}/>
      </p>
      <p>{enteredBody}</p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required />
      </p>
    </form>
  );
}

export default NewPost;