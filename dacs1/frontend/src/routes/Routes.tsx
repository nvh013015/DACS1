import { createBrowserRouter} from 'react-router-dom';
import { lazy } from 'react';
import Auth from '../pages/Auth';
import Signin from '../pages/Signin';
import Accountcreate from '../pages/Create';
import Homepage from '../pages/Homepage'
import TestConnection from '../pages/TestConnection';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />,
    },
    {
        path: '/signin',
        element: <Signin></Signin>,
    },
    {
        path: '/createaccount',
        element: <Accountcreate />,
    },
    {
        path: '/homepage',
        element: <Homepage />,
    },
    {
        path: '/test-connection',
        element: <TestConnection />,
    }
]);