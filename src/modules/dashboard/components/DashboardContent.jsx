import { FaFileMedical, FaCheckCircle, FaHourglassHalf, FaExclamationTriangle, FaSearch, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Doughnut, Line } from 'react-chartjs-2';
import { useOutletContext } from "react-router-dom";

export default function DashboardContent() {
    const {
        patients,
        departmentChartData,
        chartOptions,
        trendChartData,
        lineChartOptions
    } = useOutletContext();

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaFileMedical className="text-xl" />
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
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Mắt</button>
                    <button className="text-yellow-600 hover:text-yellow-900 mr-3"></button>
                    <button className="text-red-600 hover:text-red-900"></button>
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
    </>
  );
}