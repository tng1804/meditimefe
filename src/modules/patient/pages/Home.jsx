import { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, Search, Menu, X, ChevronLeft, ChevronRight, User } from 'lucide-react';

export default function MedicalHomepage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);



    const slides = [
        {
            image: "/image/abc.jpg",
            title: "Chăm sóc sức khỏe toàn diện",
            description: "Đội ngũ y bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại"
        },
        {
            image: "/image/slider2.jpg",
            title: "Quản lý hồ sơ bệnh án điện tử",
            description: "Theo dõi lịch sử khám bệnh và điều trị mọi lúc mọi nơi"
        },
        {
            image: "/image/abc2.png",
            title: "Đặt lịch khám trực tuyến",
            description: "Tiết kiệm thời gian chờ đợi với hệ thống đặt lịch thông minh"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000); // 5 giây

        return () => clearInterval(interval); // Clear khi unmount
    }, [slides.length]);

    const departments = [
        {name: "Nội Khoa", icon: "🫀", description: "Chẩn đoán và điều trị các bệnh lý nội khoa"},
        {name: "Ngoại Khoa", icon: "🩺", description: "Phẫu thuật và can thiệp ngoại khoa"},
        {name: "Nhi Khoa", icon: "👶", description: "Chăm sóc sức khỏe trẻ em từ sơ sinh đến 18 tuổi"},
        {name: "Sản Phụ Khoa", icon: "🤰", description: "Chăm sóc sức khỏe phụ nữ và thai sản"},
        {name: "Răng Hàm Mặt", icon: "🦷", description: "Điều trị các vấn đề về răng miệng"},
        {name: "Mắt", icon: "👁️", description: "Khám và điều trị các bệnh về mắt"}
    ];

    const doctors = [
        {name: "BS. Nguyễn Văn A", specialty: "Nội Khoa", image: "/api/placeholder/200/200", rating: 4.9},
        {name: "BS. Trần Thị B", specialty: "Nhi Khoa", image: "/api/placeholder/200/200", rating: 4.8},
        {name: "BS. Lê Minh C", specialty: "Sản Phụ Khoa", image: "/api/placeholder/200/200", rating: 4.7},
        {name: "BS. Phạm Đức D", specialty: "Răng Hàm Mặt", image: "/api/placeholder/200/200", rating: 4.9}
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Slider */}
            <div className="relative bg-gray-100 overflow-hidden">
                <div className="relative h-96 md:h-112">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="relative w-full h-full">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                                    <div className="container mx-auto px-4">
                                        <div className="max-w-lg text-white">
                                            <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                                            <p className="text-xl mb-6">{slide.description}</p>
                                            <button
                                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                Đặt lịch ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/*<button*/}
                    {/*    onClick={prevSlide}*/}
                    {/*    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2"*/}
                    {/*>*/}
                    {/*    <ChevronLeft size={24} className="text-white"/>*/}
                    {/*</button>*/}

                    {/*<button*/}
                    {/*    onClick={nextSlide}*/}
                    {/*    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2"*/}
                    {/*>*/}
                    {/*    <ChevronRight size={24} className="text-white"/>*/}
                    {/*</button>*/}

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full ${
                                    index === currentSlide ? "bg-blue-600" : "bg-white/50"
                                }`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Appointment Booking Section */}
            <div className="bg-white py-6">
                <div className="container mx-auto px-4">
                    <div className="bg-blue-50 rounded-xl p-6 shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Search size={24} className="text-blue-600"/>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Tìm kiếm bác sĩ</h3>
                                    <p className="text-sm text-gray-600">Theo chuyên khoa hoặc triệu chứng</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Calendar size={24} className="text-blue-600"/>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Đặt lịch khám</h3>
                                    <p className="text-sm text-gray-600">Chọn ngày và giờ phù hợp</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Clock size={24} className="text-blue-600"/>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Kết quả & hồ sơ</h3>
                                    <p className="text-sm text-gray-600">Xem lịch sử khám và kết quả</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Departments Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Chuyên Khoa</h2>
                        <p className="text-gray-600 mt-2">Đa dạng chuyên khoa với đội ngũ bác sĩ chuyên môn cao</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map((dept, index) => (
                            <div key={index}
                                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                                <div className="p-6">
                                    <div className="text-3xl mb-4">{dept.icon}</div>
                                    <h3 className="font-bold text-xl mb-2 text-gray-800">{dept.name}</h3>
                                    <p className="text-gray-600 mb-4">{dept.description}</p>
                                    <a href="#" className="text-blue-600 font-medium hover:text-blue-700">Tìm hiểu thêm
                                        →</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Doctors */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Bác Sĩ Tiêu Biểu</h2>
                        <p className="text-gray-600 mt-2">Đội ngũ y bác sĩ giàu kinh nghiệm, tận tâm chăm sóc bệnh
                            nhân</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {doctors.map((doctor, index) => (
                            <div key={index}
                                 className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition duration-300">
                                <img src={doctor.image} alt={doctor.name} className="w-full h-64 object-cover"/>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
                                    <p className="text-blue-600">{doctor.specialty}</p>
                                    <div className="flex items-center mt-2">
                                        <div className="flex text-yellow-400">
                                            {'★'.repeat(Math.floor(doctor.rating))}
                                            {'☆'.repeat(5 - Math.floor(doctor.rating))}
                                        </div>
                                        <span className="text-gray-600 ml-2">{doctor.rating}/5</span>
                                    </div>
                                    <button
                                        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        Đặt lịch khám
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                            Xem tất cả bác sĩ
                        </button>
                    </div>
                </div>
            </section>

            {/* Appointment CTA */}
            <section className="py-16 bg-blue-600">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="text-white mb-6 md:mb-0">
                            <h2 className="text-3xl font-bold mb-2">Đặt lịch khám ngay hôm nay</h2>
                            <p className="text-blue-100">Trải nghiệm dịch vụ y tế chất lượng cao với đội ngũ y bác sĩ
                                tận tâm</p>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50">
                                Đặt lịch khám
                            </button>
                            <button
                                className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-blue-700">
                                Tư vấn
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">Tại sao chọn chúng tôi?</h2>
                        <p className="text-gray-600 mt-2">Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao
                            nhất</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Chất lượng đảm bảo</h3>
                            <p className="text-gray-600">Đội ngũ y bác sĩ giàu kinh nghiệm, được đào tạo tại các trường
                                y hàng đầu</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Tiết kiệm thời gian</h3>
                            <p className="text-gray-600">Đặt lịch khám trực tuyến, xem hồ sơ bệnh án điện tử mọi lúc mọi
                                nơi</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Công nghệ hiện đại</h3>
                            <p className="text-gray-600">Trang thiết bị y tế hiện đại, kỹ thuật chẩn đoán và điều trị
                                tiên tiến</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}