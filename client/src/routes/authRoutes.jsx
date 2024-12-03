import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
// import Signup from '../components/SignUp/SignUp';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route>
                <Route index element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
            </Route>
        </Routes>
    );
}

export default AuthRoutes;
