import{ useState } from 'react'; // Import useState from React
import Post from './Post';
import NewPost from './NewPost'; // Import the Post component
import Modal from './Modal'; // Import the Modal component
import classes from './PostList.module.css'; // Import the CSS module for styling

function PostList({isPosting, onStopPosting}) {
    const [posts, setPosts] = useState([]); // 
    
    function addPostHandler(postData) { 
        setPosts((existingPosts) => [postData, ...existingPosts]); // Update the posts state with the new post data
    }

    return (
      <>
        {isPosting && (
          <Modal onClose={onStopPosting}>
            <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />    
          </Modal>
        )} 
        {posts.length > 0 && (           
            <ul className={classes.posts}>
            {posts.map((post, index) => (
                <Post key={index} body={post.body} author={post.author} /> // Render each post using the Post component
            ))}
            </ul>
        )}
        {posts.length === 0 && (
            <div style={{textAlign: 'center', color: 'white'}}>
                <h1>Welcome to the Post App!</h1>
                <h2>No posts found. Start adding some!</h2>
            </div>
        )}
      </>        
    );
}

export default PostList;