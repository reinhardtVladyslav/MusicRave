import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Discover from "./components/Discover/Discover";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login onLogin={() => {
        }}/>,
    },
    {
        path: "/login",
        element: <Login onLogin={() => {
        }}/>,
    },
    {
        path: "/signup",
        element: <SignUp/>,
    },
    {
        path: "/discover",
        element: <Discover/>,
    },
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);