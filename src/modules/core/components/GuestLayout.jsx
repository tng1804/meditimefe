import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Cookies from "js-cookie";

export default function GuestLayout() {
	const { user, csrfToken } = useAuth();
	const csrfTokenValue = Cookies.get('XSRF-TOKEN');
	// Nếu không có csrfToken, gọi API để lấy lại (nếu cần)
	if (!csrfTokenValue) {
		// async await
		csrfToken();
	}
	// if user is logged in, redirect to profile page
	if (user) {
		return <Navigate to="/home" />;
	}
	return (
		<>
			<Outlet />
		</>
	);
}
