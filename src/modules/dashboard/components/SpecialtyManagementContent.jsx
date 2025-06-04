import { useState } from 'react';
import useSpecialties from '../hooks/Specialties/useSpecialties.js';
import LoadingSpinner from '../../core/components/Spiner/LoadingSpinner.jsx';
import { SuccessToast, ErrorToast, WarningToast } from '../../core/components/Toast/Toasts.jsx';
import useDeleteSpecialty from '../hooks/Specialties/useDeleteSpecialty.js';
import useUpdateSpecialty from '../hooks/Specialties/useUpdateSpecialty.js';
import useCreateSpecialty from '../hooks/Specialties/useCreateSpecialty.js';
import { Tooltip } from 'react-tooltip';

export default function SpecialtyManagementContent() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ 
    name: '',
    description	: '', 
    image: '',
  });
  
  // Custom hook Specialty
  const { specialties, setSpecialties, loading, error, fetchSpecialties } = useSpecialties();
  const { deleteSpecialty, deleting } = useDeleteSpecialty();
  const { updateSpecialty, updating, errorUpdate } = useUpdateSpecialty();
  const { createSpecialty, creating, error: errorCreate } = useCreateSpecialty();

  const openAdd = () => {
    setEditing(null);
    setForm({ 
      name: '',
      description	: '', 
      image: '',
    });
    setShowModal(true);
  };

  const openEdit = (specialty) => {
    setEditing(specialty.id);
    setForm({ 
      name: specialty.name || '',
      description: specialty.description || '',
      image: specialty.image || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa thông tin chuyên khoa này?')) {
        const ok = await deleteSpecialty(id);
        if (ok) {
          showToast('success', 'Xóa thông tin chuyên khoa thành công.');
          fetchSpecialties();
        } else {
          showToast('error', 'Xóa thông tin chuyên khoa thất bại!');
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
    
    // Validate data
    if(!submitData.name){
      showToast('error', 'Bạn đã nhập thiếu dữ liệu!');
      return;
    }
    if (editing) {
      const ok = await updateSpecialty(editing, submitData);
      if (ok) {
        fetchSpecialties();
        showToast('success', 'Cập nhật thông tin chuyên khoa thành công.');
        setShowModal(false);
      } else {
        showToast('error', 'Cập nhật thông tin chuyên khoa thất bại!');
      }
    } else {
      const ok = await createSpecialty(submitData);
      if (ok) {
        showToast('success', 'Thêm chuyên khoa thành công.');
        fetchSpecialties();
        setShowModal(false);
      } else {
        showToast('error', 'Thêm chuyên khoa thất bại!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {(loading || deleting || updating || creating) && (
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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý chuyên khoa</h1>
              <p className="text-gray-600 mt-1">Quản lý thông tin chuyên khoa trong hệ thống</p>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={openAdd}
            >
              + Thêm chuyên khoa
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
                <p className="text-2xl font-bold text-gray-900">{specialties.length}</p>
                <p className="text-gray-600">Tổng chuyên khoa</p>
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
                    ID
                  </th>    
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên chuyên khoa
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mô tả
                  </th>     
                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hình ảnh
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
                {specialties.map(specialty => (
                  <tr key={specialty.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">                   
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {specialty.id}
                          </div>                        
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{specialty.name}</div>
                    </td>  
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{specialty.description}</div>
                    </td>   
                    <td className="px-6 py-4 whitespace-nowrap">
                      {specialty.image && (
                          <img
                              src={`${apiUrl}/storage/${specialty.image}`}
                              alt={specialty.name}
                              width="80" // Tăng từ 50 lên 80
                              className="rounded-md shadow-md h-auto max-h-20 object-cover"
                          />
                      )}
                      {/* <div className="text-sm text-gray-900">{specialty.description}</div> */}
                    </td>                                        
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-gray-500">
                        {specialty.created_at
                        ? new Date(specialty.created_at).toLocaleDateString('vi-VN')
                        : ''}
                      </span>
                    </td>                  
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                          onClick={() => openEdit(specialty)}
                        >
                          Sửa
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                          onClick={() => handleDelete(specialty.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {specialties.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-gray-400 rounded"></div>
                        </div>
                        <p className="text-lg font-medium">Chưa có chuyên khoa nào</p>
                        <p className="text-sm">Bấm "Thêm chuyên khoa" để bắt đầu</p>
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
              {editing ? 'Sửa thông tin chuyên khoa' : 'Thêm chuyên khoa mới'}
            </h3>
            <p className="text-gray-600 mt-1">
              {editing ? 'Cập nhật thông tin chuyên khoa' : 'Điền thông tin cho chuyên khoa mới'}
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chuyên khoa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Nhập tên chuyên khoa"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Nhập mô tả chuyên khoa"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>   
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh
                </label>
                <input
                  type="file"     
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Nhập mô tả chuyên khoa"
                  // value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.files[0] })}
                  required
                />
                {/* accept="image/*" */}
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