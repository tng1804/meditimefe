import { createBrowserRouter } from 'react-router-dom';
import Login from './modules/patient/pages/Login';
import About from './modules/patient/pages/About';
import Profile from './modules/patient/pages/Profile';
import Register from './modules/patient/pages/Register';
import MedicalHomepage from "./modules/patient/pages/Home";
import ProtectedLayout from './modules/core/components/ProtectedLayout';
import GuestLayout from "./modules/core/components/GuestLayout.jsx";
import Dashboard from './modules/dashboard/pages/Dashboard.jsx';
import DashBoardLayout from './modules/core/components/DashBoardLayout.jsx';
import PatientProfile from "./modules/patient/pages/Profile";

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},

		],
	},
	{
		path: '/',
		element: <ProtectedLayout />,
		children: [
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/profile',
				element: <PatientProfile />,
			},
			{
				path: '/home',
				element: <MedicalHomepage />,
			},


		],
	},
	{
		path: '/',
		element: <DashBoardLayout />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
			},


		],
	},
	
]);

export default router;
