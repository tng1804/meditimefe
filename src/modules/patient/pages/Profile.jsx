// import React from 'react';
// import { useAuth } from '../../core/contexts/AuthContext.jsx';
//
// export default function Profile() {
// 	const { user } = useAuth();
// 	return (
// 		<>
// 			<div className="text-6xl font-bold text-slate-600">Thông tin cá nhân</div>
// 			<hr className="bg-slate-400 h-1 w-full my-4" />
// 			<div className="block p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
// 				<h5 className="my-2 text-2xl font-bold tracking-tight">
// 					Name: {user.name}
// 				</h5>
// 				<p className="font-normal text-gray-700">Email: {user.email}</p>
// 				<p className="font-normal text-gray-700">
// 					Created At: {user.created_at}
// 				</p>
// 			</div>
// 		</>
// 	);
// }
import React, { useState } from 'react';
import { format } from 'date-fns';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { Datepicker   , Label, Select, TextInput } from 'flowbite-react';

// Mock patient data - replace with your actual data fetching
const patientInitialData = {
	id: 1,
	name: 'Nguyễn Văn A',
	email: 'nguyenvana@example.com',
	password: '••••••••',
	date_of_birth: new Date(1990, 5, 15),
	gender: 'male',
	phone: '0987654321',
	address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
	avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
};

const PatientProfile = () => {
	const [patientData, setPatientData] = useState(patientInitialData);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState(patientInitialData);

	const handleEditToggle = () => {
		if (isEditing) {
			// Cancel editing - reset form data
			setFormData(patientData);
		}
		setIsEditing(!isEditing);
	};

	const handleSave = () => {
		// Here you would typically make an API call to update user data
		setPatientData(formData);
		setIsEditing(false);
		// Add API call here: updatePatientData(formData)
		console.log('Saving data:', formData);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleDateChange = (date) => {
		setFormData({
			...formData,
			date_of_birth: date
		});
	};

	return (
		<div className="p-4 max-w-4xl mx-auto">
			<div className="bg-white rounded-lg shadow-lg overflow-hidden">
				{/* Header with title and actions */}
				<div className="p-6 flex justify-between items-center border-b border-gray-200">
					<h2 className="text-2xl font-semibold text-gray-800">Thông tin cá nhân</h2>
					<div>
						{isEditing ? (
							<div className="flex space-x-2">
								<button
									onClick={handleSave}
									className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
								>
									<FiSave className="mr-2" />
									Lưu
								</button>
								<button
									onClick={handleEditToggle}
									className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
								>
									<FiX className="mr-2" />
									Hủy
								</button>
							</div>
						) : (
							<button
								onClick={handleEditToggle}
								className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
							>
								<FiEdit2 className="mr-2" />
								Chỉnh sửa
							</button>
						)}
					</div>
				</div>

				{/* Profile content */}
				<div className="p-6">
					{/* Avatar and name section */}
					<div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
						<div className="relative">
							<img
								src={patientData.avatar}
								alt={patientData.name}
								className="w-36 h-36 rounded-full object-cover border-4 border-gray-100 shadow"
							/>
							{isEditing && (
								<div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
									<FiEdit2 size={16} />
								</div>
							)}
						</div>

						<div className="flex-1 text-center md:text-left">
							{isEditing ? (
								<div className="mb-4">
									<Label htmlFor="name" value="Họ và tên" />
									<TextInput
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										className="mt-1"
									/>
								</div>
							) : (
								<h1 className="text-3xl font-bold text-gray-800 mb-1">{patientData.name}</h1>
							)}
							<p className="text-gray-500">Mã bệnh nhân: #{patientData.id}</p>
						</div>
					</div>

					<div className="border-t border-gray-200 pt-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Email */}
							<div>
								<Label htmlFor="email" value="Email" />
								{isEditing ? (
									<TextInput
										id="email"
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										className="mt-1"
									/>
								) : (
									<p className="mt-1 text-gray-800">{patientData.email}</p>
								)}
							</div>

							{/* Password */}
							<div>
								<Label htmlFor="password" value="Mật khẩu" />
								{isEditing ? (
									<TextInput
										id="password"
										type="password"
										name="password"
										value={formData.password}
										onChange={handleInputChange}
										className="mt-1"
									/>
								) : (
									<p className="mt-1 text-gray-800">••••••••</p>
								)}
							</div>

							{/* Date of Birth */}
							<div>
								<Label htmlFor="date_of_birth" value="Ngày sinh" />
								{isEditing ? (
									<Datepicker
										id="date_of_birth"
										value={formData.date_of_birth}
										onSelectedDateChanged={handleDateChange}
										className="mt-1"
									/>
								) : (
									<p className="mt-1 text-gray-800">
										{format(new Date(patientData.date_of_birth), 'dd/MM/yyyy')}
									</p>
								)}
							</div>

							{/* Gender */}
							<div>
								<Label htmlFor="gender" value="Giới tính" />
								{isEditing ? (
									<Select
										id="gender"
										name="gender"
										value={formData.gender}
										onChange={handleInputChange}
										className="mt-1"
									>
										<option value="male">Nam</option>
										<option value="female">Nữ</option>
										<option value="other">Khác</option>
									</Select>
								) : (
									<p className="mt-1 text-gray-800">
										{patientData.gender === 'male' ? 'Nam' : patientData.gender === 'female' ? 'Nữ' : 'Khác'}
									</p>
								)}
							</div>

							{/* Phone */}
							<div>
								<Label htmlFor="phone" value="Số điện thoại" />
								{isEditing ? (
									<TextInput
										id="phone"
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleInputChange}
										className="mt-1"
									/>
								) : (
									<p className="mt-1 text-gray-800">{patientData.phone}</p>
								)}
							</div>

							{/* Address */}
							<div className="md:col-span-2">
								<Label htmlFor="address" value="Địa chỉ" />
								{isEditing ? (
									<TextInput
										id="address"
										name="address"
										value={formData.address}
										onChange={handleInputChange}
										className="mt-1"
									/>
								) : (
									<p className="mt-1 text-gray-800">{patientData.address}</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PatientProfile;
