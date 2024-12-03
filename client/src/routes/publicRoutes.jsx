import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import PublicLayout from '../components/layout/publicLayout';
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import Income from '../pages/income';
import Expenses from '../pages/expanses';
import TransactionsPage from '../pages/transactions';
import SummaryPage from '../pages/summary';
import HelpPage from '../pages/help';
import HistoryPage from '../pages/history';
import { useTheme } from '../context/theme-context';

const PublicRoutes = () => {
    const { isDarkMode } = useTheme()
    const navigate = useNavigate()

    return (
        <Routes>
            <Route element={<PublicLayout />}>
                {/* <Route path='/' element={<Home />} /> */}
                <Route path='/' element={<Dashboard isDarkMode={isDarkMode} />} />
                <Route path='/income' element={<Income isDarkMode={isDarkMode} />} />
                <Route path='/expenses' element={<Expenses isDarkMode={isDarkMode} />} />
                <Route path='/transactions' element={<TransactionsPage isDarkMode={isDarkMode} />} />
                <Route path='/summary' element={<SummaryPage isDarkMode={isDarkMode} />} />
                <Route path='/help' element={<HelpPage isDarkMode={isDarkMode} />} />
                <Route path='/history' element={<HistoryPage isDarkMode={isDarkMode} />} />
            </Route>
        </Routes>
    );
}

export default PublicRoutes;
