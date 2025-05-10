import { Outlet } from "react-router-dom";
import PostList from "../components/PostList";

function Posts() {
  return (
    <>
      <Outlet />
      {/* The Outlet component is a placeholder for the child routes. */}          
      <main>
        <PostList/>
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  // This function is used to load data before the component is rendered.
  // It can be used to fetch data from an API or perform other asynchronous operations.
  const response = await fetch('http://localhost:8080/posts'); // Fetch posts from the server
  const data = await response.json(); // Parse the response as JSON
  return data.posts; // Return the posts data
  // This data will be available in the component as props.
  // The loader function is called before the component is rendered, allowing you to fetch data and pass it to the component.
  // This is useful for server-side rendering or when you want to pre-fetch data before rendering the component.
  // The loader function is called when the route is matched, and the data returned from the loader function is passed to the component as props.
}
// The loader function is used to load data before the component is rendered.
