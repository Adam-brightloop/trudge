import { Link } from 'react-router-dom'; // Import Link for navigation
import classes from './Post.module.css'; // Import the CSS module for styling

function Post(props) {  
  const { author, body, id } = props;
  return (
    <li className={classes.post}>
      <Link to={id}>
        <h2 className={classes.author}>{author}</h2>
        <p className={classes.text}>{body}</p>
      </Link>
    </li>
  );
}   

export default Post;