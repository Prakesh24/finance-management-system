import React, { useState } from 'react';
import { menuItems } from '../../utils';
import { useAuth } from '../../context/auth-context';
import authServices from './../../services/auth.service';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/theme-context';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for mobile toggle

function Navigation() {
    const { auth, setIsAuth } = useAuth();
    const navigate = useNavigate()
    const { isDarkMode } = useTheme();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility

    const handleClick = () => {
        authServices.logout();
        setIsAuth(false)
        return navigate('/auth/')
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav
            className={`p-4 lg:p-8 w-full h-full flex flex-col justify-between gap-8 transition-all duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                } ${isSidebarOpen ? 'lg:w-full' : 'lg:w-20'}`}
        >
            <div className="flex items-center justify-between gap-4">
                {/* Toggle button for mobile view */}
                <button
                    className="lg:hidden text-xl text-gray-700 dark:text-white"
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div className="flex items-center gap-4">
                    <img
                        src="/img/avatar.png"
                        alt="User Avatar"
                        className="w-12 h-12 lg:w-20 lg:h-20 rounded-full object-cover p-1 shadow-lg border-2 border-white"
                    />
                    {auth?.user && (
                        <div className="bg-purple-400 p-2 lg:p-4 rounded-lg shadow-md">
                            <span className="text-white text-sm lg:text-xl font-bold">
                                {auth.user.email}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <ul className="flex-1 flex flex-col">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.link}
                        className={`group cursor-pointer grid grid-cols-[40px_auto] items-center my-2 font-medium transition-all duration-300 p-2 rounded-md
                            ${location.pathname === item.link ? 'text-purple-600 bg-purple-100' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        {item.icon}
                        <span
                            className={`ml-2 ${!isSidebarOpen && 'hidden lg:block'}`}
                        >
                            {item.title}
                        </span>
                    </Link>
                ))}
            </ul>

            <button
                onClick={handleClick}
                className="text-red-500 hover:bg-red-100 p-2 rounded-md transition-colors"
            >
                Logout
            </button>
        </nav>
    );
}

export default Navigation;
