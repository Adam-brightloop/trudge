import{ useState, useEffect } from 'react'; // Import useState from React
import Post from './Post';
import NewPost from './NewPost'; // Import the Post component
import Modal from './Modal'; // Import the Modal component
import classes from './PostList.module.css'; // Import the CSS module for styling

function PostList({isPosting, onStopPosting}) {
    
    const [posts, setPosts] = useState([]); 
    const [isLoading, setIsLoading] = useState(false); // State to manage loading status 

    useEffect(() => { // useEffect to fetch posts when the component mounts
      async function fetchPosts() { // Define an async function to fetch posts
        setIsLoading(true); // Set loading state to true
        const response = await fetch('http://localhost:8080/posts'); // Fetch posts from the server
        const data = await response.json(); // Parse the response as JSON
        setPosts(data.posts); // Update the posts state with the fetched data
        setIsLoading(false); // Set loading state to false
        if (!response.ok) { // Check if the response is not OK
          throw new Error('Could not fetch posts!'); // Throw an error if the response is not OK
        }
      } 

      fetchPosts(); // Call the fetchPosts function to get posts
    }, []); // Fetch posts from the server 
    
    function addPostHandler(postData) { 
      fetch('http://localhost:8080/posts', {
        method: 'POST', // Specify the HTTP method
        body: JSON.stringify(postData), // Convert the post data to a JSON string
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        }
      }); // Send a POST request to the server)
      setPosts((existingPosts) => [postData, ...existingPosts]); // Update the posts state with the new post data
    }

    return (
      <>
        {isPosting && (
          <Modal onClose={onStopPosting}>
            <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />    
          </Modal>
        )} 
        {!isLoading && posts.length > 0 && (           
            <ul className={classes.posts}>
            {posts.map((post, index) => (
                <Post key={index} body={post.body} author={post.author} /> // Render each post using the Post component
            ))}
            </ul>
        )}
        {!isLoading && posts.length === 0 && (
            <div style={{textAlign: 'center', color: 'white'}}>
                <h1>Welcome to the Post App!</h1>
                <h2>No posts found. Start adding some!</h2>
            </div>
        )}
        {isLoading && (
            <div style={{textAlign: 'center', color: 'white'}}>
                <h1>Loading...</h1>
            </div>
        )}
        {posts.length > 0 && !isLoading && (
            <div style={{textAlign: 'center', color: 'white'}}>
                <h2>Posts found: {posts.length}</h2>
            </div>
        )}
      </>        
    );
}

export default PostList;