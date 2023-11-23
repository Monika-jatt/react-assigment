import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import AuthComponent from './components/AuthComponent/AuthComponent';
import App from './App';
import RegisterPage from './components/AuthComponent/Register';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthComponent/>,
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/lists",
        element: <App />
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

