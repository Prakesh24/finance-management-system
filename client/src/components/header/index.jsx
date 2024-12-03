import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../../services/auth.service";
import { useAuth } from "../../context/auth-context";
import { useTheme } from "../../context/theme-context";
import { Switch } from '@headlessui/react';


const Header = () => {
    const { isAuth, setIsAuth } = useAuth()
    const { toggleDarkMode, isDarkMode } = useTheme()
    const navigate = useNavigate()
    const handleClick = () => {
        authServices.logout()
        setIsAuth(false)
        return navigate('/auth')
    };

    return (
        <header className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} py-5`}>
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className={`text-xl flex items-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <img src={'/img/pft-icon.png'} alt="PFT Icon" className="w-8 h-8 mr-2" />
                    Welcome to the Personal Finance Tracker
                </h1>

                <nav className="flex items-center gap-4">
                    <label className="flex items-center space-x-2">
                        <Switch
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                            className={`group relative flex h-10 w-16 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'
                                }`}
                        >
                            <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block rounded-full ring-0 shadow-lg transition duration-200 ease-in-out size-6 ${isDarkMode ? 'translate-x-7 bg-gray-400' : 'translate-x-0 bg-white'
                                    }`}
                            />
                        </Switch>
                    </label>
                    <ul className="flex gap-5 items-center">
                        {isAuth ? (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleClick}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/auth" className="hover:text-blue-500">
                                    Login
                                </Link>
                                <Link to="/auth/signup" className="hover:text-blue-500">
                                    Signup
                                </Link>
                            </div>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
