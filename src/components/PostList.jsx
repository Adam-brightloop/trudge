import Post from './Post'; // Import the Post component
import classes from './PostList.module.css'; // Import the CSS module for styling
function PostList(){
    return (
        <ul className={classes.posts}>
            <Post author="Adam" body="Master Web Engineer" />
            <Post author="Berta" body="Master Smelly Girl" />
            <Post author="Gracie" body="Little Idiot" />
        </ul>
        
    );
}

export default PostList;