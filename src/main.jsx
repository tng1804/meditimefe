import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './modules/core/contexts/AuthContext';
import router from './router';
import './index.css';
// import 'flowbite/dist/flowbite.css'; // bắt buộc để spinner hoạt động

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);