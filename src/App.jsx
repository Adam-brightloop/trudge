import { useState } from "react";
import MainHeader from "./components/MainHeader";
import PostList from "./components/PostList";

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  function hideModalHandler() {
    setModalIsVisible(false); // Hide the modal when the button is clicked
  }
  function showModalHandler() {
    setModalIsVisible(true); // Show the modal when the button is clicked
  }

  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
      <PostList 
        isPosting={modalIsVisible}
        onStopPosting={hideModalHandler}
      />
    </main>
    </>
  );
}

export default App;
