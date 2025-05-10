import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Posts, { loader as postsLoader }from './routes/Posts'
import NewPost, { action as newPostAction } from './routes/NewPost'
import PostDetails, { loader as postDetailsLoader } from './routes/PostDetails'
import RootLayout from './routes/RootLayout'
import './index.css'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <RootLayout />, 
    children: [
      { 
        path: '/', 
        element: <Posts />, 
        loader:postsLoader, // Load posts data before rendering the Posts component
        children: [
          {path: '/new-post', element: <NewPost />, action: newPostAction}, // Define the new post route as a child of the root route
          {path: '/:id', element: <PostDetails />, loader: postDetailsLoader}, // Define the post details route as a child of the root route
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
