import { useState } from 'react';
import useAccounts from '../hooks/Accounts/useAccounts.js'; 
import LoadingSpinner from '../../core/components/Spiner/LoadingSpinner.jsx';
import useDeleteAccount from '../hooks/Accounts/useDeleteAccount';
import useUpdateAccount from '../hooks/Accounts/useUpdateAccount';
import useCreateAccount from '../hooks/Accounts/useCreateAccount';
import { SuccessToast, ErrorToast, WarningToast } from '../../core/components/Toast/Toasts.jsx';

// const initialAccounts = [
//   { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'admin', status: 1 },
// ];

const roleMap = {
  admin: 'Quản trị viên',
  doctor: 'Bác sĩ',
  receptionist: 'Lễ tân',
  patient: 'Bệnh nhân',
};

export default function AccountManagementContent() {
//   const [accounts, setAccounts] = useState(initialAccounts);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'doctor', status: 1});
  
  // Custom hook account
  const { accounts, setAccounts, loading, error, fetchAccounts } = useAccounts();
  const { deleteAccount, deleting } = useDeleteAccount();
  const { updateAccount, updating, errorUpdate } = useUpdateAccount();
  const { createAccount, creating, errorCreate} = useCreateAccount();

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', email: '', password: '', role: 'doctor', status: 1 });
    setShowModal(true);
  };

  const openEdit = (acc) => {
    setEditing(acc.id);
    setForm({ ...acc, password: '' }); // Không show password cũ, chỉ nhập mới nếu muốn đổi 
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa tài khoản này?')) {
        const ok = await deleteAccount(id);
        if (ok) {
          showToast('success', 'Xóa tài khoản thành công.');
          fetchAccounts(); // gọi lại API để cập nhật danh sách
        } else {
          showToast('error', 'Xóa tài khoản thất bại!');
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
    let submitData = { ...form };
    // Nếu là edit và không nhập password thì không gửi field password
    if (editing && !form.password) {
      delete submitData.password;
    }
    if (editing) {

      // Don't have server: chỉ xử lý fe
      // setAccounts(accounts.map(acc => acc.id === editing ? { ...form, id: editing } : acc));
      
      // Have Server
      const ok = await updateAccount(editing, submitData);
      if (ok) {
        showToast('success', 'Cập nhật tài khoản thành công.');
        fetchAccounts();
        setShowModal(false);
      } else {
        // Ưu tiên errorUpdate, fallback nếu không có thì báo lỗi chung
      showToast('error', errorUpdate?.response?.data?.message || errorUpdate?.message || 'Cập nhật tài khoản thất bại!');
      }
    } else {
      const ok = await createAccount(submitData);
      if (ok) {
        showToast('success', 'Thêm tài khoản thành công.');
        fetchAccounts();
        setShowModal(false);
      } else {
        // Ưu tiên errorCreate, fallback nếu không có thì báo lỗi chung
      showToast('error', errorCreate?.response?.data?.message || errorCreate?.message || 'Thêm tài khoản thất bại!');
      }
    }
    setShowModal(false);
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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý tài khoản</h1>
              <p className="text-gray-600 mt-1">Quản lý thông tin tài khoản người dùng trong hệ thống</p>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={openAdd}
            >
              + Thêm tài khoản
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
                <p className="text-2xl font-bold text-gray-900">{accounts.length}</p>
                <p className="text-gray-600">Tổng tài khoản</p>
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
                  {accounts.filter(acc => acc.status === 1).length}
                </p>
                <p className="text-gray-600">Đang hoạt động</p>
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
                  {accounts.filter(acc => acc.status === 0).length}
                </p>
                <p className="text-gray-600">Bị khóa</p>
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
                    Thông tin
                  </th>
                  <th className="px-9 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
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
                {accounts.map(acc => (
                  <tr key={acc.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {acc.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{acc.name}</div>
                          <div className="text-sm text-gray-500">{acc.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        acc.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        acc.role === 'doctor' ? 'bg-blue-100 text-blue-800' :
                        acc.role === 'receptionist' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {roleMap[acc.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        acc.status === 1 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        
                        {acc.status === 1 ? 'Hoạt động' : 'Khóa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex  py-1 text-xs font-medium rounded-full`}>
                        {acc.created_at
                        ? new Date(acc.created_at).toLocaleDateString('vi-VN')
                        : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                          onClick={() => openEdit(acc)}
                        >
                          Sửa
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                          onClick={() => handleDelete(acc.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {accounts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-gray-400 rounded"></div>
                        </div>
                        <p className="text-lg font-medium">Chưa có tài khoản nào</p>
                        <p className="text-sm">Bấm "Thêm tài khoản" để bắt đầu</p>
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {editing ? 'Sửa tài khoản' : 'Thêm tài khoản mới'}
            </h3>
            <p className="text-gray-600 mt-1">
              {editing ? 'Cập nhật thông tin tài khoản' : 'Điền thông tin cho tài khoản mới'}
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Nhập họ và tên"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu {editing ? '' : <span className="text-red-500">*</span>}
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder={editing ? "Để trống nếu không đổi" : "Nhập mật khẩu"}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required={!editing}
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vai trò
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                >
                  <option value="admin">Quản trị viên</option>
                  <option value="doctor">Bác sĩ</option>
                  <option value="receptionist">Lễ tân</option>
                  <option value="patient">Bệnh nhân</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="1">Hoạt động</option>
                  <option value="0">Khóa</option>
                </select>
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