import React, {useEffect, useState} from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from '../../../axios.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import LoadingSpinner from "./Spiner/LoadingSpinner.jsx";

export default function DashBoardLayout() {
	const domainUrl = import.meta.env.VITE_DOMAIN_URL || '/';
	const [loading, setLoading] = useState(false);
	const { user, setUser } = useAuth();


	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/" />;
	}
	console.log("user" , user.role);
	if(user.role == 'patient'){
		// useNavigate("/home" );
		return <Navigate to="/home" />;
	}
	return (
		<>
			{loading && (
				<div className="fixed top-0 left-0 w-full h-full z-50">
					<div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
						<LoadingSpinner/>
					</div>
				</div>
			)}
			<main className="container flex justify-center flex-col items-center mx-0 px-0 max-w-full">
				<Outlet/>
			</main>
			
		</>
	);
}
