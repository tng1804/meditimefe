import { Heart, Brain, Stethoscope, Eye, Baby, Users, Bone, Zap, Pill, Activity } from "lucide-react"
import { Link } from "react-router-dom"
import useSpecialties from "../../dashboard/hooks/Specialties/useSpecialties"
import LoadingSpinner from '../../core/components/Spiner/LoadingSpinner.jsx';


export default function MedicalSpecialties() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { specialties, setSpecialties, loading, error, fetchSpecialties } = useSpecialties();

  return (

    <div className="w-full min-h-screen bg-gray-50">
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full z-50">
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Chuyên Khoa</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Đa dạng chuyên khoa với đội ngũ bác sĩ chuyên môn cao
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {specialties.map((specialty) => (
                  <Link
                    key={specialty.id}
                    to={`/specialties/${specialty.id}`}
                    className="group flex flex-col items-center p-6 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-24 h-24 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 overflow-hidden bg-gray-50">
                      {specialty.image && (
                        <img
                          src={`${apiUrl}/storage/${specialty.image}`}
                          alt={specialty.name}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      )}
                    </div>
                    <span className="text-base font-semibold text-gray-900 text-center leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {specialty.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 mt-16 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Cần Tư Vấn Y Tế?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm sẵn sàng tư vấn và hỗ trợ bạn 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                  Liên hệ ngay
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>

  );
}
