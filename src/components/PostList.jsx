import Post from './Post';
import classes from './PostList.module.css'; // Import the CSS module for styling
import { useLoaderData } from 'react-router-dom';

function PostList() {  
    const posts = useLoaderData(); // Get the posts data from the loader  
    return (
      <>
        {posts.length > 0 && (           
            <ul className={classes.posts}>
            {posts.map((post) => (
                <Post key={post.id} id={post.id} body={post.body} author={post.author} /> // Render each post using the Post component
            ))}
            </ul>
        )}
        {posts.length === 0 && (
            <div style={{textAlign: 'center', color: 'white'}}>
                <h1>Welcome to the Post App!</h1>
                <h2>No posts found. Start adding some!</h2>
            </div>
        )}
        {posts.length > 0 &&(
            <div style={{textAlign: 'center', color: 'white'}}>
                <h2>Posts found: {posts.length}</h2>
            </div>
        )}
      </>        
    );
}

export default PostList;