import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './modules/core/contexts/AuthContext';
import './index.css';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
		{/*<Dashboard/>*/}
	</React.StrictMode>
);