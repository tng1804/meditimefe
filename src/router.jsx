import { createBrowserRouter } from 'react-router-dom';
import Login from './modules/patient/pages/Login';
import About from './modules/patient/pages/About';
import Profile from './modules/patient/pages/Profile';
import Register from './modules/patient/pages/Register';
import MedicalHomepage from "./modules/patient/pages/Home";
import ProtectedLayout from './modules/core/components/ProtectedLayout';
import GuestLayout from "./modules/core/components/GuestLayout.jsx";
import DashBoardLayout from './modules/core/components/DashBoardLayout.jsx';
import Dashboard from './modules/dashboard/pages/dashboard.jsx'
import DashboardContent from './modules/dashboard/components/DashboardContent.jsx';
import AccountManagementContent from './modules/dashboard/components/AccountManagementContent.jsx';
import PatientProfile from "./modules/patient/pages/Profile";
import DoctorManagementContent from './modules/dashboard/components/DoctorManagementContent.jsx';
import ReceptionistManagementContent from './modules/dashboard/components/ReceptionistManagementContent.jsx';
import PatientManagementContent from './modules/dashboard/components/PatientManagementContent.jsx';
import SpecialtyManagementContent from './modules/dashboard/components/SpecialtyManagementContent.jsx';
import MedicalSpecialties from './modules/patient/pages/Specialties.jsx';
import MedicalSpecialtyDetail from './modules/patient/pages/SpecialtyDetail.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{ path: '/', element: <Login /> },
      		{ path: '/register', element: <Register /> },
		],
	},
	{
		path: '/',
		element: <ProtectedLayout />,
		children: [
			{ path: '/about', element: <About /> },
			{ path: '/profile', element: <PatientProfile /> },
			{ path: '/home', element: <MedicalHomepage /> },
			{ path: '/specialties', element: <MedicalSpecialties /> },
			{ path: '/specialties/:id', element: <MedicalSpecialtyDetail /> },
		],
	},
	{
		path: '/dashboard',
		element: <DashBoardLayout />,
		children: [
			{
				path: '',
				element: <Dashboard />, // Dashboard layout (sidebar, header, outlet)
				children: [
				{
					index: true,
					element: <DashboardContent />,
				},
				{
					path: 'accounts',
					element: <AccountManagementContent />,
				},
				{
					path: 'doctors',
					element: <DoctorManagementContent />,
				},
				{
					path: 'receptionists',
					element: <ReceptionistManagementContent />,
				},
				{
					path: 'patients',
					element: <PatientManagementContent />,
				},
				{
					path: 'specialties',
					element: <SpecialtyManagementContent />,
				},
				// Thêm các route con khác nếu cần
				],
			},

		],
	},
	
]);

export default router;
