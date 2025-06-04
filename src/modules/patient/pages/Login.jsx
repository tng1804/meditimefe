import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../../../axios.js';
import { useAuth } from '../../core/contexts/AuthContext.jsx';
// import Skeleton from "react-loading-skeleton";
// import 'react-loading-skeleton/dist/skeleton.css';
import LoadingSpinner from "../../core/components/Spiner/LoadingSpinner.jsx";

export default function Login() {
	const { setUser, csrfToken } = useAuth();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

	// Load saved credentials from localStorage on mount
	useEffect(() => {
		const savedEmail = localStorage.getItem('savedEmail');
		const savedPassword = localStorage.getItem('savedPassword');
		const savedRemember = localStorage.getItem('remember') === 'true';

		if (savedRemember && savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRemember(true);
        }
	}, [])

	// Handle login submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const body = { email, password };
		await csrfToken();
		try {
			const resp = await axios.post('/api/login', body);
			if (resp.status === 200) {
				setUser(resp.data); //resp.data.user
				// Save credentials to localStorage if "remember" is checked
				if (remember) {
                    localStorage.setItem('savedEmail', email);
                    localStorage.setItem('savedPassword', password);
                    localStorage.setItem('remember', 'true');
                } else {
                    localStorage.removeItem('savedEmail');
                    localStorage.removeItem('savedPassword');
                    localStorage.removeItem('remember');
                }

				if(user.role == 'patient'){
					useNavigate("/home" );
				}else{
					useNavigate("/dashboard");
				}
			}
		} catch (error) {
			if (error.response?.status === 401) {
				setError(error.response.data.message);
			} else if(error.response?.status === 403){
				setError(error.response.data.message);
			} else {
				setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
			}
		}
		finally {
			setLoading(false);
		}
	};

	return (

		<div className="flex justify-center items-center min-h-screen bg-gray-50">
			{loading && (
					<div className="fixed top-0 left-0 w-full h-full z-50">
						<div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
							<LoadingSpinner/>
						</div>
					</div>
					)}
					<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
						<div className="flex justify-center mb-6 items-center">
							<img className="w-12 h-12" src="/image/healthcare.png" alt="MediTime"/>
							<span className="ml-2 text-xl font-semibold text-blue-500">MediTime</span>
						</div>

						<h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>

						{error && (
							<div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
								{error}
							</div>
						)}

						{/*{loading ? (*/}
						{/*	<div className="space-y-4">*/}
						{/*		<Skeleton height={40} />*/}
						{/*		<Skeleton height={40} />*/}
						{/*		<Skeleton height={30} />*/}
						{/*		<Skeleton height={50} />*/}
						{/*		<Skeleton height={20} />*/}
						{/*		<Skeleton height={50} />*/}
						{/*		<Skeleton height={50} />*/}
						{/*		<Skeleton height={20} />*/}
						{/*	</div>*/}
						{/*) : (*/}
						<form className="space-y-4" onSubmit={handleSubmit}>
							<div>
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
									Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
									placeholder="abc@gmail.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<div>
								<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
									Mật khẩu
								</label>
								<input
									type="password"
									name="password"
									id="password"
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
									placeholder="••••••••"
									value={password}
                            		onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember"
										type="checkbox"
										className="w-4 h-4 border-gray-300 rounded focus:outline-none focus:ring-0 focus:ring-transparent"
										checked={remember}
                                		onChange={(e) => setRemember(e.target.checked)}
									/>
									<label htmlFor="remember" className="ml-2 text-sm text-gray-600">
										Lưu mật khẩu
									</label>
								</div>
								<p className="text-center text-sm text-gray-600">
									<Link to="#" className="text-blue-600 hover:underline">Quên mật khẩu?</Link>
								</p>
							</div>

							<button
								type="submit"
								className="w-full py-3 text-white font-medium bg-gray-800 hover:bg-gray-900 rounded-lg">
								Đăng nhập
							</button>

							<div className="text-center text-sm text-gray-500">
								Hoặc
							</div>

							<button type="button"
									className="w-full py-3 flex justify-center items-center border border-gray-300 rounded-lg hover:bg-gray-200">
								<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
									<path
										d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.559 3.921 1.488l2.935-2.935C17.256 2.868 14.992 1.998 12.545 1.998 6.963 1.998 2.455 6.506 2.455 12s4.508 10.002 10.09 10.002c8.478 0 10.325-7.866 9.486-11.762l-9.486-.001z"
										fill="#4285F4"/>
								</svg>
								Đăng nhập bằng Google
							</button>

							<button type="button"
									className="w-full py-3 flex justify-center items-center border border-gray-300 rounded-lg hover:bg-gray-200">
								<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
									<path
										d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"
										fill="#1877F2"/>
								</svg>
								Đăng nhập bằng Facebook
							</button>

							<p className="text-center text-sm text-gray-600">
								Bạn chưa có tài khoản? <Link to="/register" className="text-blue-600 hover:underline">Đăng
								ký</Link>
							</p>
						</form>
						{/*)}*/}
					</div>
				</div>
			);
			}