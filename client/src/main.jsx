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
import SearchResultsPage from './pages/SearchResultsPage';

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
        element: <SearchResultsPage />
      },
      {
        path: '/book/:bookId',
        element: <BookDetail />
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