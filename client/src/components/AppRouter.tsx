import {useNavigate, Route, Routes, Navigate} from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage';
import StudentsPage from '../pages/StudentsPage';
import LessonsPage from "../pages/LessonsPage";
import MyProfilePage from '../pages/MyProfilePage';
import LoginPage from "../pages/LoginPage";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { privateRoutes } from '../router/routes';
import RequestIncerceptor from '../http/RequestInterceptor';

const AppRouter = () => {

    const { state } = useContext(AuthContext);

    const navigate = useNavigate();

    return(
        state.isAuth 
            ? 
            <RequestIncerceptor>
                <Routes>
                    {privateRoutes.map(route => 
                        <Route
                            path={route.path}
                            element={<route.component/>}
                            key={route.path}>
                        </Route>
                    )}
                    <Route
                        path='*'
                        element={<Navigate to="/error" replace></Navigate>}
                        key="*">
                    </Route>
                </Routes>
            </RequestIncerceptor>
            :
            <Routes>
                <Route
                    path="*"
                    element={<LoginPage/>}>
                </Route>
            </Routes>
    )
}

export default AppRouter;