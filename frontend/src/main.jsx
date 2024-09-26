import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AppProvider from './page/context/AppContext'
import Login from './page/module/Login'
import Home from './page/module/Home'
import AdminModule from './page/module/AdminModule'
import AccountComponent from './page/component/AccountComponent'
import ErrorComponent from './page/component/ErrorComponent'
import EmployerModule from './page/module/EmployerModule'
import JobComponent from './page/component/JobComponent'
import ApplicantConmponent from './page/component/ApplicantConmponent'
import CompanyComponent from './page/component/CompanyComponent'
import ApplicantModule from './page/module/ApplicantModule'
import JobListComponent from './page/component/JobListComponent'
import ApplicationComponent from './page/component/ApplicationComponent'
import VerifyComponent from './page/component/VerifyComponent'
import PartnerComponent from './page/component/PartnerComponent'
import ProfessionComponent from './page/component/ProfessionComponent'
import SkillComponent from './page/component/SkillComponent'
import LinkComponent from './page/component/LinkComponent'
import NewJobComponent from './page/component/NewJobComponent'
import JobSettingComponent from './page/component/JobSettingComponent'
import JobSkillComponent from './page/component/JobSkillComponent'

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
        path: 'partner',
        element: <PartnerComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'profession',
        element: <ProfessionComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'profession/:id',
        element: <SkillComponent />,
        errorElement: <ErrorComponent />,
        children: [
          {
            path: ':skillID',
            element: <LinkComponent />
          }
        ]
      },
      {
        index: true,
        element: <Navigate to={'verify'} replace/>
      }
    ]
  },
  {
    path: '/employer',
    element: <EmployerModule />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: 'jobs',
        element: <JobComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'jobs/new-job-post',
        element: <NewJobComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'jobs/:jobID',
        element: <JobSettingComponent />,
        errorElement: <ErrorComponent />,
        children: [
          {
            path:'applicant',
            element: <ApplicantConmponent />,
            errorElement: <ErrorComponent />,
          },
          {
            path:'skill',
            element: <JobSkillComponent />,
            errorElement: <ErrorComponent />,
          },
          {
            path:'modify',
            element: <Home />,
            errorElement: <ErrorComponent />,
          },
          {
            index: true,
            element: <Navigate to={'applicant'} replace />
          }
        ]
      },
      {
        path: 'applicants',
        element: <ApplicantConmponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'company',
        element: <CompanyComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        index: true,
        element: <Navigate to={'jobs'} replace />
      }
    ]
  },
  {
    path: '/applicant',
    element: <ApplicantModule />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: 'jobs',
        element: <JobListComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'application',
        element: <ApplicationComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        index: true,
        element: <Navigate to={'jobs'} replace />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <RouterProvider router={router}/>
  </AppProvider>
)
