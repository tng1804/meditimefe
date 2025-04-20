import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../../../axios.js';

const AuthContent = createContext({
	user: null,
	setUser: () => {},
	csrfToken: () => {},
});

export const AuthProvider = ({ children }) => {
	const [user, _setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	// set user to local storage
	const setUser = (user) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
		_setUser(user);
	};

	// check if user is logged in or not from server: Nếu bên login response chưa setUser
	// useEffect(() => {
	// 	// Nếu KHÔNG phải đang ở trang login hoặc register thì mới call API
	// 	const isPublicRoute = ['/', '/register'].includes(location.pathname);
	// 	if (!isPublicRoute) {
	// 		(async () => {
	// 			try {
	// 				const resp = await axios.get('/user');
	// 				if (resp.status === 200) {
	// 					setUser(resp.data.data);
	// 				}
	// 			} catch (error) {
	// 				if (error.response.status === 401) {
	// 					localStorage.removeItem('user');
	// 					window.location.href = '/';
	// 				}
	// 			}
	// 		})();
	// 	}
	// }, []);

	// csrf token generation for guest methods
	const csrfToken = async () => {
		await axios.get('http://localhost:8000/sanctum/csrf-cookie');
		return true;
	};

	return (
		<AuthContent.Provider value={{ user, setUser, csrfToken }}>
			{children}
		</AuthContent.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContent);
};
