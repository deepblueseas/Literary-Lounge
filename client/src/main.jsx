import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import BookDetail from './pages/BookDetail';
import SearchResultsPage from './pages/SearchResultsPage'; // Import the SearchResultsPage component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/search',
        element: <SearchResultsPage /> // Add the route for search results
      },
      {
        path: '/book/:bookId',
        element: <BookDetail /> // Assuming 'bookId' is the correct parameter for BookDetail
      },
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: '/profiles/:userId',
        element: <Profile />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);