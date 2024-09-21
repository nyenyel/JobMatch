import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AppProvider from './page/context/AppContext'
import Login from './page/module/Login'
import Home from './page/module/Home'
import AdminModule from './page/module/AdminModule'
import MessageComponent from './page/component/MessageComponent'
import VerifyComponent from './page/component/VerifyComponent'
import AccountComponent from './page/component/AccountComponent'
import ErrorComponent from './page/component/ErrorComponent'

const router = createBrowserRouter([
  
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorComponent />

  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorComponent />

  },
  {
    path: '/admin',
    element: <AdminModule />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: 'message',
        element: <MessageComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'verify',
        element: <VerifyComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'accounts',
        element: <AccountComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        index: true,
        element: <Navigate to={'message'} replace/>
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <RouterProvider router={router}/>
  </AppProvider>
)
