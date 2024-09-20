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
import ErrorPage from './page/component/ErrorPage'

const router = createBrowserRouter([
  
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />

  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />

  },
  {
    path: '/admin',
    element: <AdminModule />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   index: true,
      //   path: <Navigate to={'message'} replace/>,
      // },
      {
        path: 'message',
        element: <MessageComponent />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'verify',
        element: <VerifyComponent />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'accounts',
        element: <AccountComponent />,
        errorElement: <ErrorPage />,
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <RouterProvider router={router}/>
  </AppProvider>
)
