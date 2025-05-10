import classes from './NewPost.module.css';
import Modal from '../components/Modal'; // Import the Modal component
import { Link, Form, redirect } from 'react-router-dom';

function NewPost() {  
  return (
    <Modal>
      <Form method='post' className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3}/>
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required/>
        </p>
        <p className={classes.actions}>
          <button type="submit" className={classes.submit}>Add Post</button>
          <Link to="/" type="button" className={classes.cancel} >Cancel</Link>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({request}) { 
  const formData = await request.formData(); // Get the form data from the request
  const postData = Object.fromEntries(formData); // Convert the form data to an object
  //postData.id = Math.random().toString(); // Generate a random ID for the new post
  //postData.date = new Date().toISOString(); // Get the current date and time in ISO format
  // Note: The ID and date are not needed if the server generates them automatically.
  // The server will handle the ID and date generation.



  await fetch('http://localhost:8080/posts', { // Send a POST request to the server to add the new post
    // Note: The URL should match the server's endpoint for adding posts.
    method: 'POST', // Specify the HTTP method
    body: JSON.stringify(postData), // Convert the post data to a JSON string
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
  }); // Send a POST request to the server)

  return redirect('/'); // Redirect to the root route after adding the post
  // Note: The redirect function is imported from 'react-router-dom' and is used to navigate to a different route after the action is completed.
}