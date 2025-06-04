// src/hooks/useLogout.js
import { useState } from 'react';
import axios from '../../../axios';
import { useAuth } from '../contexts/AuthContext';

export default function useLogout() {
	const [loading, setLoading] = useState(false);
    const {setUser} = useAuth();

	const logout = async () => {
		setLoading(true);
		try {
			const resp = await axios.post('/api/logout');
			if (resp.status === 200) {
                setUser(null);
				window.location.href = '/';
			}
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			setLoading(false);
		}
	};

	return { logout, loading };
}
