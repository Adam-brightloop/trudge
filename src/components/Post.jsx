import classes from './Post.module.css'; // Import the CSS module for styling

function Post(props) {  
  const { author, body } = props;
  return (
    <li className={classes.post}>
      <h2 className={classes.author}>{author}</h2>
      <p className={classes.text}>{body}</p>
    </li>
  );
}   

export default Post;