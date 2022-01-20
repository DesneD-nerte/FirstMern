import {useNavigate, Route, Routes, Navigate} from 'react-router-dom'
import Error from '../pages/Error';
import Main from '../pages/Main';
import Students from '../pages/Students';
import Lessons from "../pages/Lessons";
import Login from "../pages/Login";
import { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../context/tokenContext';

const AppRouter = () => {
    const {isAuth, setIsAuth, isLoading} = useContext(TokenContext);
    const navigate = useNavigate();
    
    return(
        <Routes>
           {isAuth 
                ? 
                <>
                <Route
                    path="/"
                    //</Routes>element={localStorage.getItem('token') ? <Main/> : navigate('/login', {replace: true})}>
                    element={<Main />}>
                </Route>
                <Route
                    path="/lessons"
                    element={<Lessons />}>
                </Route>
                <Route
                    path="/students"
                    element={<Students />}>
                </Route>
                <Route
                    path="/error"
                    element={<Error />}>
                </Route>
                <Route
                    path="/login"
                    element={<Error />}>
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/" replace></Navigate>}>
                </Route>
                </>
                :
                <>
                <Route
                    path="*"
                    element={<Login/>}>
                </Route>
                </>
           }
        </Routes>
    );
}

export default AppRouter;