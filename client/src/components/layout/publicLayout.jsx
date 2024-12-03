import React from 'react';
import { useTheme } from '../../context/theme-context';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../header';
import Navigation from '../navigation';
import { useAuth } from '../../context/auth-context';

const PublicLayout = () => {
    const { isDarkMode } = useTheme()
    const { isAuth } = useAuth()
    const navigate = useNavigate()
    if (!isAuth) {
        return navigate('/auth')
    }
    return (
        <div>
            <Header />
            <div className='grid grid-cols-4'>
                <div className='col-span-1 w-full'>
                    <Navigation />
                </div>
                <div className={`col-span-3 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default PublicLayout;
