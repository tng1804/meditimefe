
import {useAuth} from "../../core/contexts/AuthContext.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import LoadingSpinner from '../../core/components/Spiner/LoadingSpinner.jsx';
import useLogout from '../../core/hooks/useLogout.jsx';
import SideBarDB from '../components/SideBarDB.jsx';
import { 
 FaBell, FaEnvelope, FaUser,
} from 'react-icons/fa';
// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function DashBoard() {
  const {user} = useAuth();
  const { logout, loading } = useLogout();

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

  const roleShortenMap = {
    admin: 'QTV',
    doctor: 'BS',
    receptionist: 'LT'
    };

    const role = roleShortenMap[user.role] || null;

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

  // Lấy pathname để truyền active state cho sidebar
  const location = useLocation();

  return (
    <div className="bg-gray-100 font-sans h-screen overflow-hidden w-full">
    {loading && (
                  <div className="fixed top-0 left-0 w-full h-full z-50">
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
                          <LoadingSpinner/>
                      </div>
                  </div>
                )}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SideBarDB onLogout={logout} user={user}  activePath={location.pathname}/>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
          {/* ...header... */}
          {/* Top Navigation */}
          {/* <header className="bg-white shadow-sm">
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
                  <span className="ml-2 text-sm font-medium">{role}. {user.name}</span>
                </div>
              </div>
            </div>
          </header> */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet 
              context={{
                patients,
                departmentChartData,
                chartOptions,
                trendChartData,
                lineChartOptions
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;