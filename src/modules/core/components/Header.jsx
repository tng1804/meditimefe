// components/Header.jsx
import React, { useState } from 'react';
import { Phone, Menu, X, User } from 'lucide-react';
import  {NavLink} from 'react-router-dom';
export default function Header({ onLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <img className="w-10 h-10 mx-3" src="/image/healthcare.png" alt="MediTime"/>
                        <div className="text-blue-600 font-bold text-2xl">MediTime</div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                            }
                        >
                            Trang chủ
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                            }
                        >
                            Giới thiệu
                        </NavLink>

                        <NavLink
                            to="/specialties"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                            }
                        >
                            Chuyên khoa
                        </NavLink>

                        <NavLink
                            to="/doctors"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                            }
                        >
                            Đội ngũ bác sĩ
                        </NavLink>

                        <NavLink
                            to="/news"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                            }
                        >
                            Tin tức
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                            }
                        >
                            Liên hệ
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                (isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600") +
                                " flex items-center"
                            }
                        >
                            <User size={20} className="mr-1" />
                            Tài khoản
                        </NavLink>

                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                onLogout();
                            }}
                            href="#"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Đăng xuất
                        </a>
                    </nav>


                    <div className="flex items-center space-x-4">
                    <button className="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <Phone size={16} className="mr-2" />
                            Hotline: 0868763236
                        </button>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                            <a href="#" className="text-gray-600 hover:text-blue-600">Đội ngũ bác sĩ</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Tin tức</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Liên hệ</a>
                            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
                                <User size={20} className="mr-1"/>
                                Tài khoản
                            </a>
                            <a onClick={onLogout} href="#" className="text-gray-600 hover:text-blue-600">Đăng xuất</a>
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
    );
}