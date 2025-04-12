import { useState } from 'react';
import { Calendar, Clock, Phone, Search, Menu, X, ChevronLeft, ChevronRight, User } from 'lucide-react';

export default function MedicalHomepage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "/api/placeholder/1200/400",
            title: "Chăm sóc sức khỏe toàn diện",
            description: "Đội ngũ y bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại"
        },
        {
            image: "/api/placeholder/1200/400",
            title: "Quản lý hồ sơ bệnh án điện tử",
            description: "Theo dõi lịch sử khám bệnh và điều trị mọi lúc mọi nơi"
        },
        {
            image: "/api/placeholder/1200/400",
            title: "Đặt lịch khám trực tuyến",
            description: "Tiết kiệm thời gian chờ đợi với hệ thống đặt lịch thông minh"
        }
    ];

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
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <div className="text-blue-600 font-bold text-2xl">MediCare</div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-blue-600 font-medium">Trang chủ</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Giới thiệu</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Chuyên khoa</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Bác sĩ</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Tin tức</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Liên hệ</a>
                            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
                                <User size={20} className="mr-1"/>
                                Hồ sơ của tôi
                            </a>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <button
                                className="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <Phone size={16} className="mr-2"/>
                                Hotline: 1900 xxxx
                            </button>

                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                                {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t py-2">
                        <div className="container mx-auto px-4">
                            <nav className="flex flex-col space-y-3 py-3">
                                <a href="#" className="text-blue-600 font-medium">Trang chủ</a>
                                <a href="#" className="text-gray-600 hover:text-blue-600">Giới thiệu</a>
                                <a href="#" className="text-gray-600 hover:text-blue-600">Chuyên khoa</a>
                                <a href="#" className="text-gray-600 hover:text-blue-600">Bác sĩ</a>
                                <a href="#" className="text-gray-600 hover:text-blue-600">Tin tức</a>
                                <a href="#" className="text-gray-600 hover:text-blue-600">Liên hệ</a>
                                <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
                                    <User size={20} className="mr-1"/>
                                    Hồ sơ của tôi
                                </a>
                                <div className="pt-2">
                                    <button
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        <Phone size={16} className="mr-2"/>
                                        Hotline: 1900 xxxx
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

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

                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2"
                    >
                        <ChevronLeft size={24} className="text-white"/>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2"
                    >
                        <ChevronRight size={24} className="text-white"/>
                    </button>

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

            {/* Footer */}
            <footer className="bg-gray-800 text-white pt-12 pb-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">MediCare</h3>
                            <p className="text-gray-300 mb-4">Chăm sóc sức khỏe toàn diện với dịch vụ y tế chất lượng
                                cao.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-300 hover:text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white">Trang chủ</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Giới thiệu</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Chuyên khoa</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Đội ngũ bác sĩ</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Đặt lịch khám</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white">Khám tổng quát</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Khám chuyên khoa</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Xét nghiệm</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Điều trị </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}