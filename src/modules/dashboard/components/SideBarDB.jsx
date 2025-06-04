import { useState } from 'react';
import { 
   FaBars, FaUserMd, FaTachometerAlt, FaNotesMedical, FaProcedures, FaStethoscope , FaUserTie, 
  FaCalendarCheck, FaPills, FaChartLine, FaCog, FaBell, FaEnvelope, FaUser,
  FaFileMedical, FaCheckCircle, FaHourglassHalf, FaExclamationTriangle, 
  FaSearch, FaPlus, FaEye, FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { MdSupportAgent, MdAccessibilityNew  } from "react-icons/md";
import { FaHospital, FaUserGroup, FaUserDoctor } from "react-icons/fa6";
import { PiArrowFatLineLeftFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";

export default function SideBarDB({ onLogout, user, activePath}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };
    const roleMap = {
    admin: 'Quản trị viên',
    doctor: 'Bác sĩ',
    receptionist: 'Lễ tân'
    };

    const role = roleMap[user.role] || null;

    const navClass = (isActive) =>
    `flex items-center px-4 py-3 ${isActive ? 'bg-blue-700 text-blue-100' : 'hover:bg-blue-700 text-white'} ${sidebarCollapsed ? 'justify-center' : ''}`;

    return (     
            <div className={`bg-blue-800 text-white flex flex-col ${sidebarCollapsed ? 'w-24' : 'w-64'} transition-all duration-300`}>
                {/* ...logo, user... */}
                <div className="p-4 flex items-center justify-between border-b border-blue-700">
                <div className="flex items-center">
                <FaHospital className="text-2xl" />
                {/* <img className="w-12 h-12" src="/image/healthcare.png" alt="MediTime"/> */}
                    {!sidebarCollapsed && <span className="font-bold text-xl ml-3">MEDITIME</span>}
                </div>
                <button onClick={toggleSidebar} className="text-white focus:outline-none">
                    <FaBars />
                </button>
                </div>
                
                {/* User Profile */}
                <div className={`p-4 flex items-center  ${sidebarCollapsed ? 'justify-center' : 'justify-start'} border-b border-blue-700`}>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <FaUserMd />
                </div>
                {!sidebarCollapsed && (
                    <div className="ml-3">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-blue-200">{role}</div>
                    </div>
                )}
                </div>
                
                {/* Menu */}
                <nav className="flex-1 overflow-y-auto">
                <ul className="py-2">
                    <li>
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) => navClass(isActive)}
                            >
                            <FaTachometerAlt className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Tổng quan</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/accounts"
                            className={({ isActive }) => navClass(isActive)}
                            >
                            <FaUserGroup className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Quản lý tài khoản</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/doctors"
                            className={({ isActive }) => navClass(isActive)}
                            >
                            <FaUserDoctor className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Quản lý bác sĩ</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/receptionists"
                            className={({ isActive }) => navClass(isActive)}
                            >
                            <MdSupportAgent className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Quản lý lễ tân</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/patients"
                            className={({ isActive }) => navClass(isActive)}
                            >
                            <FaProcedures className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Quản lý bệnh nhân</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/specialties"
                            className={({ isActive }) => navClass(isActive)}
                            >
                            <FaStethoscope className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Quản lý chuyên khoa</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/ho-so-benh-an"
                            className={({ isActive }) => navClass(isActive)}
                            >
                            <FaNotesMedical className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Hồ sơ bệnh án</span>}
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to="/dashboard/patients"
                            className={({ isActive }) => navClass(isActive)}
                            >
                            <FaProcedures className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Bệnh nhân</span>}
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink
                            to="/dashboard/medicines"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 ${sidebarCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-blue-700' : ''}`
                            }
                        >
                            <FaPills className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Thuốc</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/reports"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 ${sidebarCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-blue-700' : ''}`
                            }
                        >
                            <FaChartLine className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Báo cáo</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/settings"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 ${sidebarCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-blue-700' : ''}`
                            }
                        >
                            <FaCog className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Cài đặt</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="#"
                            onClick={onLogout}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 ${sidebarCollapsed ? 'justify-center' : ''}`
                            }
                        >
                            <PiArrowFatLineLeftFill className={sidebarCollapsed ? '' : 'mr-3'} />
                            {!sidebarCollapsed && <span>Đăng xuất</span>}
                        </NavLink>
                    </li>
                </ul>
                </nav>
                
                {/* Footer */}
                <div className="p-4 border-t border-blue-700 text-center text-xs text-blue-200">
                {!sidebarCollapsed && <div>MEDITIME &copy; 2025</div>}
                </div>
        </div>
        
    );
}