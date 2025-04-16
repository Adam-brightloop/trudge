

function Post(props) {  
  const { author, body } = props;
  return (
    <div>
      <h2>{author}</h2>
      <p>{body}</p>
    </div>
  );
}   

export default Post;