import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios.js';
import { useAuth } from '../../core/contexts/AuthContext.jsx';
import {Navigate} from 'react-router-dom';
import LoadingSpinner from "../../core/components/Spiner/LoadingSpinner.jsx";

export default function Register() {
	const { setUser, csrfToken } = useAuth();
	const [nameError, setNameError] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
	const [loading, setLoading] = useState(false);

	// register user
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { name, email, password, cpassword } = e.target.elements;
		const body = {
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: cpassword.value,
			role: role.value,
		};
		try {
			// csrfToken();

			const resp = await axios.post('/api/register', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				return <Navigate to="/home" />;
			}
		} catch (error) {
			if (error.response.status === 422) {
				console.log(error.response.data.errors);
				if (error.response.data.errors.name) {
					setNameError(error.response.data.errors.name[0]);
				} else {
					setNameError('');
				}
				if (error.response.data.errors.email) {
					setEmailError(error.response.data.errors.email[0]);
				} else {
					setEmailError('');
				}
				if (error.response.data.errors.password) {
					setPasswordError(error.response.data.errors.password[0]);
				} else {
					setPasswordError('');
				}
			}
		} finally {
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

				<h1 className="text-2xl font-bold mb-6">Đăng Ký</h1>
				<form className="space-y-4" onSubmit={handleSubmit}>

					<div>
						<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
							Họ tên
						</label>
						<input
							type="text"
							name="name"
							id="name"
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
							placeholder="Trần Văn A"
							required
						/>
						{nameError && (
							<p className="text-sm text-red-600">{nameError}</p>
						)}
					</div>

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
							required
						/>
						{emailError && (
							<p className="text-sm text-red-600">{emailError}</p>
						)}
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
							placeholder="••••••"
							required
						/>
						{passwordError && (
							<p className="text-sm text-red-600">{passwordError}</p>
						)}
					</div>

					<div>
						<label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-700">
							Nhập lại mật khẩu
						</label>
						<input
							type="password"
							name="cpassword"
							id="cpassword"
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
							placeholder="••••••"
							required
						/>

					</div>

					<input type="hidden" name="role" id = "role" value="patient"/>
					<button
						type="submit"
						className="w-full py-3 text-white font-medium bg-gray-800 hover:bg-gray-900 rounded-lg">
						Đăng ký
					</button>


					<p className="text-center text-sm text-gray-600">
						Bạn đã có tài khoản? <Link to="/" className="text-blue-600 hover:underline">Đăng
						nhập</Link>
					</p>
				</form>
			</div>
		</div>

	);
}
