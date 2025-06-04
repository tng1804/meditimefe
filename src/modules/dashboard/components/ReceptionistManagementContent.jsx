import { useState } from 'react';
import useReceptionists from '../hooks/Receptionists/useReceptionists.js';
import LoadingSpinner from '../../core/components/Spiner/LoadingSpinner.jsx';
import { SuccessToast, ErrorToast, WarningToast } from '../../core/components/Toast/Toasts.jsx';
import useDeleteReceptionist from '../hooks/Receptionists/useDeleteReceptionist.js';
import useUpdateReceptionist from '../hooks/Receptionists/useUpdateReceptionist.js';
import useGetAvailableUsers from '../hooks/Receptionists/useGetAvailableUsers';
import useCreateReceptionist from '../hooks/Receptionists/useCreateReceptionist';
import { Tooltip } from 'react-tooltip';
// Mock data cho demo
const initialReceptionists = [
  {
    id: 1,
    user_id: 23,
    address: 'Chưa xác định',
    note: 'TEMP-23',
    phone: '',
    gender: 'other',
    date_of_birth: '2025-05-24',
    status: 'inactive',
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


export default function ReceptionistManagementContent() {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ 
    user_id: '', 
    address: '', 
    note: '', 
    phone: '', 
    gender: 'male', 
    date_of_birth: '', 
    status: 'active' 
  });
  
  // Custom hook Receptionist
  const { receptionists, setReceptionists, loading, error, fetchReceptionists } = useReceptionists();
  const { deleteReceptionist, deleting } = useDeleteReceptionist();
  const { updateReceptionist, updating, errorUpdate } = useUpdateReceptionist();
  const { availableUsers, loading: loadingUsers, fetchAvailableUsers } = useGetAvailableUsers();
  const { createReceptionist, creating, error: errorCreate } = useCreateReceptionist();

  const openAdd = () => {
    setEditing(null);
    setForm({ 
      user_id: '', 
      gender: 'male', 
      date_of_birth: '', 
      phone: '', 
      address: '', 
      status: 'active',
      note: '', 

    });
    setShowModal(true);
  };

  const openEdit = (receptionist) => {
    setEditing(receptionist.id);
    setForm({ 
      user_id: receptionist.user_id || '',
      gender: receptionist.gender || 'male',
      date_of_birth: receptionist.date_of_birth || '',
      phone: receptionist.phone?? ' ',
      address: receptionist.address || '',
      status: receptionist.status || 'active',
      note: receptionist.note || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa thông tin lễ tân này?')) {
        const ok = await deleteReceptionist(id);
        if (ok) {
          showToast('success', 'Xóa thông tin lễ tân thành công.');
          fetchReceptionists();
          fetchAvailableUsers();
        } else {
          showToast('error', 'Xóa thông tin lễ tân thất bại!');
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
      showToast('error', 'Không còn người dùng nào để thêm lễ tân mới!');
      return;
    }
    let submitData = { ...form };
    
    // Validate data
    if(!submitData.date_of_birth || !submitData.address || !submitData.phone){
      showToast('error', 'Bạn đã nhập thiếu dữ liệu!');
      return;
    }
    if (editing) {
      const ok = await updateReceptionist(editing, submitData);
      if (ok) {
        fetchReceptionists();
        showToast('success', 'Cập nhật thông tin lễ tân thành công.');
        setShowModal(false);
      } else {
        showToast('error', 'Cập nhật thông tin lễ tân thất bại!');
      }
    } else {
      const ok = await createReceptionist(submitData);
      if (ok) {
        showToast('success', 'Thêm lễ tân thành công.');
        fetchReceptionists();
        setShowModal(false);
      } else {
        showToast('error', 'Thêm lễ tân thất bại!');
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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý lễ tân</h1>
              <p className="text-gray-600 mt-1">Quản lý thông tin lễ tân trong hệ thống</p>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={openAdd}
            >
              + Thêm lễ tân
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
                <p className="text-2xl font-bold text-gray-900">{receptionists.length}</p>
                <p className="text-gray-600">Tổng lễ tân</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {receptionists.filter(receptionist => receptionist.status === 'active').length}
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
                  {receptionists.filter(receptionist => receptionist.status === 'inactive').length}
                </p>
                <p className="text-gray-600">Không làm việc</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thông tin lễ tân
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
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ghi chú
                  </th>               
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {receptionists.map(receptionist => (
                  <tr key={receptionist.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {receptionist.user.avatar ? (
                                <img
                                  src={receptionist.user.avatar}
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
                            lễ tân: {receptionist.user.name} #{receptionist.user.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {/* Số chứng chỉ: {receptionist.note} */}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{genderMap[receptionist.gender]}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-gray-500">
                        {receptionist.date_of_birth
                        ? new Date(receptionist.date_of_birth).toLocaleDateString('vi-VN')
                        : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{receptionist.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {receptionist.address}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        receptionist.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {statusMap[receptionist.status]}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-gray-500">
                        {receptionist.created_at
                        ? new Date(receptionist.created_at).toLocaleDateString('vi-VN')
                        : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-[120px]">
                      <span
                        className="block  py-1 text-sm text-gray-900 rounded-full truncate max-w-[104px]" // 120px - padding (px-3 = 12px mỗi bên)
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={receptionist.note}
                      >
                        {receptionist.note}
                      </span>
                      <Tooltip id="my-tooltip" />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                          onClick={() => openEdit(receptionist)}
                        >
                          Sửa
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                          onClick={() => handleDelete(receptionist.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {receptionists.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-gray-400 rounded"></div>
                        </div>
                        <p className="text-lg font-medium">Chưa có lễ tân nào</p>
                        <p className="text-sm">Bấm "Thêm lễ tân" để bắt đầu</p>
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
              {editing ? 'Sửa thông tin lễ tân' : 'Thêm lễ tân mới'}
            </h3>
            <p className="text-gray-600 mt-1">
              {editing ? 'Cập nhật thông tin lễ tân' : 'Điền thông tin cho lễ tân mới'}
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
                    <div className="text-xs text-red-500 mt-1">Không còn người dùng nào để thêm lễ tân mới.</div>
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
                        const user = receptionists.find(d => d.user_id === form.user_id)?.user;
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

              

              <div >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">Đang làm việc</option>
                  <option value="inactive">Không làm việc</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.note}
                  onChange={e => setForm({ ...form, note: e.target.value })}
                  rows={4} // Tùy chỉnh chiều cao textarea
                  placeholder="Nhập ghi chú..."
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