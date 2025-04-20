import React, {useEffect, useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from '../../../axios.js';
import { useAuth } from '../contexts/AuthContext';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import LoadingSpinner from "./Spiner/LoadingSpinner.jsx";
import useLogout from '../hooks/useLogout.jsx';

export default function DefaultLayout() {
	const domainUrl = import.meta.env.VITE_DOMAIN_URL || '/';
	const { user, setUser } = useAuth();
	// Hook handle logout
	const { logout, loading } = useLogout();

	// check if user is logged in or not from server
	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const resp = await axios.get('/user');
	// 			if (resp.status === 200) {
	// 				setUser(resp.data.data);
	// 			}
	// 		} catch (error) {
	// 			if (error.response.status === 401) {
	// 				localStorage.removeItem('user');
	// 				window.location.href = '/';
	// 			}
	// 		}
	// 	})();
	// }, []);

	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/" />;
	}

	if (user.role != 'patient'){
		return <Navigate to = "/dashboard" />;
	}
	return (
		<>
			{user.role == 'patient' && (
				<Header onLogout={logout}/>
			)}
			{loading && (
				<div className="fixed top-0 left-0 w-full h-full z-50">
					<div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
						<LoadingSpinner/>
					</div>
				</div>
			)}
			<main className="container flex justify-center flex-col items-center mx-auto mt-10 mb-10">
				<Outlet/>
			</main>

			{user.role == 'patient' && (
				<Footer/>
			)}
			
		</>
	);
}
