import{ useState } from 'react'; // Import useState from React
import Post from './Post';
import NewPost from './NewPost'; // Import the Post component
import Modal from './Modal'; // Import the Modal component
import classes from './PostList.module.css'; // Import the CSS module for styling

function PostList({isPosting, onStopPosting}) {
    return (
      <>
        {isPosting && (
          <Modal onClose={onStopPosting}>
            <NewPost onCancel={onStopPosting} />    
          </Modal>
        )}                        
        <ul className={classes.posts}>
          <Post author="Adam" body="Master Web Engineer" />
        </ul>
      </>        
    );
}

export default PostList;