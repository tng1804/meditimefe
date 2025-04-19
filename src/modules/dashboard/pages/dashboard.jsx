// src/App.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaHospital, FaBars, FaUserMd, FaTachometerAlt, FaNotesMedia, FaProcedures, 
  FaCalendarCheck, FaPills, FaChartLine, FaCog, FaBell, FaEnvelope, FaUser,
  FaFilemedical, FaCheckCircle, FaHourglassHalf, FaExclamationTriangle, 
  FaSearch, FaPlus, FaEye, FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Chart data
  const departmentChartData = {
    labels: ['Nội khoa', 'Ngoại khoa', 'Nhi khoa', 'Cấp cứu', 'Tim mạch', 'Nội tiết'],
    datasets: [{
      data: [320, 240, 180, 150, 120, 70],
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6',
        '#EC4899'
      ],
      borderWidth: 0
    }]
  };

  const trendChartData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Nhập viện',
        data: [85, 92, 78, 105, 120, 95],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderWidth: 2,
        fill: true,
        tension: 0.3
      },
      {
        label: 'Xuất viện',
        data: [75, 85, 70, 95, 110, 90],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        borderWidth: 2,
        fill: true,
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      }
    }
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Mock patient data
  const patients = [
    {
      id: 'HS-2023-001',
      name: 'Nguyễn Thị B',
      gender: 'Nữ',
      age: 35,
      diagnosis: 'Viêm phổi cấp',
      admissionDate: '15/06/2023',
      department: 'Nội khoa',
      status: 'Đã xuất viện',
      statusClass: 'bg-green-100 text-green-800',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg'
    },
    {
      id: 'HS-2023-002',
      name: 'Trần Văn C',
      gender: 'Nam',
      age: 52,
      diagnosis: 'Gãy xương đùi',
      admissionDate: '18/06/2023',
      department: 'Ngoại khoa',
      status: 'Đang điều trị',
      statusClass: 'bg-yellow-100 text-yellow-800',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 'HS-2023-003',
      name: 'Lê Thị D',
      gender: 'Nữ',
      age: 28,
      diagnosis: 'Tiểu đường type 2',
      admissionDate: '20/06/2023',
      department: 'Nội tiết',
      status: 'Đang điều trị',
      statusClass: 'bg-yellow-100 text-yellow-800',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: 'HS-2023-004',
      name: 'Phạm Văn E',
      gender: 'Nam',
      age: 45,
      diagnosis: 'Tăng huyết áp',
      admissionDate: '22/06/2023',
      department: 'Tim mạch',
      status: 'Cần xử lý',
      statusClass: 'bg-red-100 text-red-800',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
      id: 'HS-2023-005',
      name: 'Hoàng Thị F',
      gender: 'Nữ',
      age: 5,
      diagnosis: 'Sốt virus',
      admissionDate: '25/06/2023',
      department: 'Nhi khoa',
      status: 'Đã xuất viện',
      statusClass: 'bg-green-100 text-green-800',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
    }
  ];

  return (
    <div className="bg-gray-100 font-sans h-screen overflow-hidden">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-blue-800 text-white flex flex-col ${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
          {/* Logo */}
          <div className="p-4 flex items-center justify-between border-b border-blue-700">
            <div className="flex items-center">
              <FaHospital className="text-2xl" />
              {!sidebarCollapsed && <span className="font-bold text-xl ml-3">MEDICARE</span>}
            </div>
            <button onClick={toggleSidebar} className="text-white focus:outline-none">
              <FaBars />
            </button>
          </div>
          
          {/* User Profile */}
          <div className="p-4 flex items-center border-b border-blue-700">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <FaUserMd />
            </div>
            {!sidebarCollapsed && (
              <div className="ml-3">
                <div className="font-medium">BS. Nguyễn Văn A</div>
                <div className="text-xs text-blue-200">Quản trị viên</div>
              </div>
            )}
          </div>
          
          {/* Menu */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-2">
              <li>
                <a href="#" className={`flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <FaTachometerAlt className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && <span>Tổng quan</span>}
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center px-4 py-3 bg-blue-700 text-white ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <FaNotesMedia className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && <span>Hồ sơ bệnh án</span>}
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <FaProcedures className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && <span>Bệnh nhân</span>}
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <FaCalendarCheck className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && <span>Lịch hẹn</span>}
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <FaPills className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && <span>Thuốc</span>}
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <FaChartLine className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && <span>Báo cáo</span>}
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <FaCog className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && <span>Cài đặt</span>}
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-blue-700 text-center text-xs text-blue-200">
            {!sidebarCollapsed && <div>MEDICARE &copy; 2023</div>}
          </div>
        </div>
        
        {/* Main Content */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
          {/* Top Navigation */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <h1 className="text-xl font-bold text-gray-800">Quản lý hồ sơ bệnh án</h1>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                    <FaBell className="text-xl" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                  </button>
                </div>
                <div className="relative">
                  <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                    <FaEnvelope className="text-xl" />
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">5</span>
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaUser className="text-blue-600" />
                  </div>
                  <span className="ml-2 text-sm font-medium">BS. Nguyễn Văn A</span>
                </div>
              </div>
            </div>
          </header>
          
          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <FaFilemedical className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Tổng hồ sơ</p>
                    <h3 className="text-2xl font-bold">1,248</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <FaCheckCircle className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Đã hoàn thành</p>
                    <h3 className="text-2xl font-bold">856</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <FaHourglassHalf className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Đang điều trị</p>
                    <h3 className="text-2xl font-bold">392</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-600">
                    <FaExclamationTriangle className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Cần xử lý</p>
                    <h3 className="text-2xl font-bold">24</h3>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-lg font-semibold text-gray-800">Danh sách hồ sơ bệnh án</h2>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="relative">
                    <input type="text" placeholder="Tìm kiếm..." className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                  <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Tất cả khoa</option>
                    <option>Nội khoa</option>
                    <option>Ngoại khoa</option>
                    <option>Cấp cứu</option>
                    <option>Nhi khoa</option>
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                    <FaPlus className="mr-2" />
                    <span>Thêm hồ sơ</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Patient Records Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã HS</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bệnh nhân</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chẩn đoán</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày nhập viện</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khoa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={patient.avatar} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                              <div className="text-sm text-gray-500">{patient.gender}, {patient.age} tuổi</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.diagnosis}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.admissionDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.statusClass}`}>{patient.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3"><FaEye /></button>
                          <button className="text-yellow-600 hover:text-yellow-900 mr-3"><FaEdit /></button>
                          <button className="text-red-600 hover:text-red-900"><FaTrashAlt /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Trước </a>
                  <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Sau </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Hiển thị
                      <span className="font-medium mx-1">1</span>
                      đến
                      <span className="font-medium mx-1">5</span>
                      của
                      <span className="font-medium mx-1">1248</span>
                      kết quả
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Trước</span>
                        <FaChevronLeft className="h-5 w-5" />
                      </a>
                      <a href="#" aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>
                      <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
                      <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 3 </a>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
                      <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 8 </a>
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Sau</span>
                        <FaChevronRight className="h-5 w-5" />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Phân bố hồ sơ theo khoa</h3>
                  <select className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Tháng này</option>
                    <option>Quý này</option>
                    <option>Năm nay</option>
                  </select>
                </div>
                <div className="h-64">
                  <Doughnut data={departmentChartData} options={chartOptions} />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Xu hướng nhập viện</h3>
                  <select className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>6 tháng gần đây</option>
                    <option>1 năm</option>
                    <option>2 năm</option>
                  </select>
                </div>
                <div className="h-64">
                  <Line data={trendChartData} options={lineChartOptions} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;