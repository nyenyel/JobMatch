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
import JobPostModify from './page/component/JobPostModify'
import ApplicantSkillComponent from './page/component/ApplicantSkillComponent'
import ApplicantExperienceComponent from './page/component/ApplicantExperienceComponent'
import ViewJobPostComponent from './page/component/ViewJobPostComponent'
import ApplicantSummaryComponent from './page/component/ApplicantSummaryComponent'
import DashboardComponent from './page/component/DashboardComponent'
import DocumentUpload from './page/component/DocumentUpload'
import RegisterComponent from './page/component/RegisterComponent'
import ProfileComponent from './page/component/ProfileComponent'
import EmployerRegistrationComponent from './page/component/EmployerRegistrationComponent'
import OtherProfileComponent from './page/component/OtherProfileComponent'
import SearchComponent from './page/component/SearchComponent'
import ApplicantSearchComponent from './page/component/ApplicantSearchComponent'
import SearchJobPostComponent from './page/component/SearchJobPostComponent'
import SearchResultComponent from './page/component/SearchResultComponent'
import EmployerApplicant from './page/component/EmployerApplicant'
import AdminRegisterAccount from './page/component/AdminRegisterAccount'
import AdminDocumentUpload from './page/component/AdminDocumentUpload'
import AdminEmployerRegister from './page/component/AdminEmployerRegister'
import SearchCompanyResultComponent from './page/component/SearchCompanyResultComponent'
import SearchJobsResultComponent from './page/component/SearchJobsResultComponent'
import TestingComponent from './page/component/ChatComponent'
import App from './page/testing/App'
import PusherProvider, { PusherContext } from './page/context/PusherContext'
import SearchUserForEmployer from './page/component/SearchUserForEmployer'

const router = createBrowserRouter([
  
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorComponent />
  },
  {
    path: '/register',
    element: <RegisterComponent />,
    errorElement: <ErrorComponent />
  },
  {
    path: '/register/applicant',
    element: <DocumentUpload />,
    errorElement: <ErrorComponent />
  },
  {
    path: '/register/employer',
    element: <EmployerRegistrationComponent />,
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
        path: 'search/:term',
        element: <SearchResultComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'search/company/:id',
        element: <SearchCompanyResultComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'search/jobs/:id',
        element: <SearchJobsResultComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'profile',
        element: <ProfileComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'verify',
        element: <VerifyComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'dashboard',
        element: <DashboardComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'accounts',
        element: <AccountComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'accounts/new-account',
        element: <AdminRegisterAccount />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'accounts/new-account/applicant',
        element: <AdminDocumentUpload />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'accounts/new-account/employer',
        element: <AdminEmployerRegister />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'accounts/:id',
        element: <OtherProfileComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'company',
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
        path: 'search/:term',
        element: <SearchResultComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'search/company/:id',
        element: <SearchCompanyResultComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'search/jobs/:id',
        element: <SearchJobsResultComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'search/user/:id',
        element: <SearchUserForEmployer />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'applicant',
        element: <EmployerApplicant />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'profile',
        element: <ProfileComponent />,
        errorElement: <ErrorComponent />,
      },
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
            path:'applicant/:username',
            element: <ApplicantSummaryComponent />,
            errorElement: <ErrorComponent />,
          },
          {
            path:'skill',
            element: <JobSkillComponent />,
            errorElement: <ErrorComponent />,
          },
          {
            path:'modify',
            element: <JobPostModify />,
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
        path: 'profile',
        element: <ProfileComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'search/:term',
        element: <SearchResultComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'search/company/:id',
        element: <SearchCompanyResultComponent isApplicant={true}/>,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'search/jobs/:id',
        element: <SearchJobsResultComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'jobs',
        element: <JobListComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'jobs/:id',
        element: <ViewJobPostComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'application',
        element: <ApplicationComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path:'skill',
        element: <ApplicantSkillComponent />,
        errorElement: <ErrorComponent />,
      },
      {
        path:'experience',
        element: <ApplicantExperienceComponent />,
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
