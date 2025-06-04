import { useState } from 'react';
import usePatients from '../hooks/Patients/usePatients.js';
import LoadingSpinner from '../../core/components/Spiner/LoadingSpinner.jsx';
import { SuccessToast, ErrorToast, WarningToast } from '../../core/components/Toast/Toasts.jsx';
import useDeletePatient from '../hooks/Patients/useDeletePatient.js';
import useUpdatePatient from '../hooks/Patients/useUpdatePatient.js';
import useGetAvailableUsers from '../hooks/Patients/useGetAvailableUsers';
import useCreatePatient from '../hooks/Patients/useCreatePatient';
import { Tooltip } from 'react-tooltip';
// Mock data cho demo
const initialPatients = [
  {
    id: 1,
    user_id: 23,
    address: 'Chưa xác định',
    phone: '',
    gender: 'other',
    date_of_birth: '2025-05-24',
    created_at: '2025-05-24 02:49:33',
    updated_at: '2025-05-24 02:49:33'
  }
];

const genderMap = {
  male: 'Nam',
  female: 'Nữ',
  other: 'Khác',
};

const statusMap = {
  active: 'Làm việc',
  inactive: 'Không làm việc',
};


export default function PatientManagementContent() {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ 
    user_id: '', 
    address: '', 
    phone: '', 
    gender: 'male', 
    date_of_birth: '', 
  });
  
  // Custom hook Patient
  const { patients, setPatients, loading, error, fetchPatients } = usePatients();
  const { deletePatient, deleting } = useDeletePatient();
  const { updatePatient, updating, errorUpdate } = useUpdatePatient();
  const { availableUsers, loading: loadingUsers, fetchAvailableUsers } = useGetAvailableUsers();
  const { createPatient, creating, error: errorCreate } = useCreatePatient();

  const openAdd = () => {
    setEditing(null);
    setForm({ 
      user_id: '', 
      gender: 'male', 
      date_of_birth: '', 
      phone: '', 
      address: '', 

    });
    setShowModal(true);
  };

  const openEdit = (patient) => {
    setEditing(patient.id);
    setForm({ 
      user_id: patient.user_id || '',
      gender: patient.gender || 'male',
      date_of_birth: patient.date_of_birth || '',
      phone: patient.phone?? ' ',
      address: patient.address || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa thông tin bệnh nhân này?')) {
        const ok = await deletePatient(id);
        if (ok) {
          showToast('success', 'Xóa thông tin bệnh nhân thành công.');
          fetchPatients();
          fetchAvailableUsers();
        } else {
          showToast('error', 'Xóa thông tin bệnh nhân thất bại!');
        }
    }
  };

  // Toast state
  const [toast, setToast] = useState({ show: false, type: '', text: '' });

  // Hàm show toast
  const showToast = (type, text) => {
    setToast({ show: true, type, text });
    setTimeout(() => setToast({ show: false, type: '', text: '' }), 3000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing && availableUsers.length === 0) {
      showToast('error', 'Không còn người dùng nào để thêm bệnh nhân mới!');
      return;
    }
    let submitData = { ...form };
    
    // Validate data
    if(!submitData.date_of_birth || !submitData.address || !submitData.phone){
      showToast('error', 'Bạn đã nhập thiếu dữ liệu!');
      return;
    }
    if (editing) {
      const ok = await updatePatient(editing, submitData);
      if (ok) {
        fetchPatients();
        showToast('success', 'Cập nhật thông tin bệnh nhân thành công.');
        setShowModal(false);
      } else {
        showToast('error', 'Cập nhật thông tin bệnh nhân thất bại!');
      }
    } else {
      const ok = await createPatient(submitData);
      if (ok) {
        showToast('success', 'Thêm bệnh nhân thành công.');
        fetchPatients();
        setShowModal(false);
      } else {
        showToast('error', 'Thêm bệnh nhân thất bại!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {loading && (
            <div className="fixed top-0 left-0 w-full h-full z-50">
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
                    <LoadingSpinner/>
                </div>
            </div>
        )}
        {/* Toast hiển thị ở góc phải trên */}
        {toast.show && (
          <div className="fixed top-5 right-5 z-50">
            {toast.type === 'success' && <SuccessToast text={toast.text} />}
            {toast.type === 'error' && <ErrorToast text={toast.text} />}
            {toast.type === 'warning' && <WarningToast text={toast.text} />}
          </div>
        )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý bệnh nhân</h1>
              <p className="text-gray-600 mt-1">Quản lý thông tin bệnh nhân trong hệ thống</p>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={openAdd}
            >
              + Thêm bệnh nhân
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                <p className="text-gray-600">Tổng bệnh nhân</p>
              </div>
            </div>
          </div>
          {/* <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter(patient => patient.status === 'active').length}
                </p>
                <p className="text-gray-600">Đang làm việc</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-red-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter(patient => patient.status === 'inactive').length}
                </p>
                <p className="text-gray-600">Không làm việc</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thông tin bệnh nhân
                  </th>    
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giới tính
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày sinh
                  </th>          
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số điện thoại
                  </th>
                  
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Địa chỉ
                  </th>                 
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>                             
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map(patient => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {patient.user.avatar ? (
                                <img
                                  src={patient.user.avatar}
                                  alt="Avatar"
                                  className="w-6 h-6 rounded-full inline-block object-cover"
                                />
                                ) : (
                                'BS'
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            bệnh nhân: {patient.user.name} #{patient.user.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {/* Số chứng chỉ: {patient.note} */}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        patient.gender === 'male' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {genderMap[patient.gender]}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-gray-500">
                        {patient.date_of_birth
                        ? new Date(patient.date_of_birth).toLocaleDateString('vi-VN')
                        : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {patient.address}
                      </span>
                    </td>
                    
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-gray-500">
                        {patient.created_at
                        ? new Date(patient.created_at).toLocaleDateString('vi-VN')
                        : ''}
                      </span>
                    </td>                  
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                          onClick={() => openEdit(patient)}
                        >
                          Sửa
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                          onClick={() => handleDelete(patient.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {patients.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-gray-400 rounded"></div>
                        </div>
                        <p className="text-lg font-medium">Chưa có bệnh nhân nào</p>
                        <p className="text-sm">Bấm "Thêm bệnh nhân" để bắt đầu</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal thêm/sửa */}
      {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {editing ? 'Sửa thông tin bệnh nhân' : 'Thêm bệnh nhân mới'}
            </h3>
            <p className="text-gray-600 mt-1">
              {editing ? 'Cập nhật thông tin bệnh nhân' : 'Điền thông tin cho bệnh nhân mới'}
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!editing ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Người dùng <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={form.user_id}
                    onChange={e => setForm({ ...form, user_id: e.target.value })}
                    required
                  >
                    <option value="">-- Chọn người dùng --</option>
                    {availableUsers.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} (ID: {user.id}, Email: {user.email})
                      </option>
                    ))}
                  </select>
                  {loadingUsers && <div className="text-xs text-gray-400 mt-1">Đang tải danh sách...</div>}
                  {!loadingUsers && availableUsers.length === 0 && (
                    <div className="text-xs text-red-500 mt-1">Không còn người dùng nào để thêm bệnh nhân mới.</div>
                  )}
                </div>
                ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Người dùng
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-100 text-gray-700"
                    value={
                      (() => {
                        // Tìm user theo user_id để hiển thị thông tin
                        const user = patients.find(d => d.user_id === form.user_id)?.user;
                        return user
                          ? `${user.name} (ID: ${user.id}, Email: ${user.email})`
                          : form.user_id;
                      })()
                    }
                    disabled
                  />
                </div>
              )}
              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.date_of_birth}
                  onChange={e => setForm({ ...form, date_of_birth: e.target.value })}
                />
              </div>
              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới tính
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.gender}
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Nhập số điện thoại"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Nhập địa chỉ"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  required
                />
              </div>                       
            </div>
          </div>

          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              type="button"
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-200"
              onClick={() => setShowModal(false)}
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={handleSubmit}
              disabled={!editing && availableUsers.length === 0}
            >
              {editing ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}