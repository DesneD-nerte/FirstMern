import {useNavigate, Route, Routes, Navigate} from 'react-router-dom'
import Error from '../pages/Error';
import Main from '../pages/Main';
import Students from '../pages/Students';
import Lessons from "../pages/Lessons";
import MyProfile from '../pages/MyProfile';
import Login from "../pages/Login";
import { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../context/tokenContext';
import { privateRoutes } from '../router/routes';

const AppRouter = () => {
    const {isAuth, setIsAuth, isLoading} = useContext(TokenContext);
    const navigate = useNavigate();
    // return(
    //     <Routes>
    //        {isAuth 
    //             ? 
    //             <>
    //             <Route
    //                 path="/"
    //                 //</Routes>element={localStorage.getItem('token') ? <Main/> : navigate('/login', {replace: true})}>
    //                 element={<Main />}
    //                 key="/">
    //             </Route>
    //             <Route
    //                 path="/lessons"
    //                 element={<Lessons />}
    //                 key="/lessons">
    //             </Route>
    //             <Route
    //                 path="/students"
    //                 element={<Students />}
    //                 key="/students">
    //             </Route>
    //             <Route
    //                 path="/myProfile"
    //                 element={<MyProfile></MyProfile>}
    //                 key="/myProfile">
    //             </Route>
    //             <Route
    //                 path="/error"
    //                 element={<Error />}
    //                 key="/error">
    //             </Route>
    //             <Route
    //                 path="/login"
    //                 element={<Error />}
    //                 key="/login">
    //             </Route>
    //             <Route
    //                 path="*"
    //                 element={<Navigate to="/" replace></Navigate>}
    //                 key="*">
    //             </Route>
    //             </>
    //             :
    //             <>
    //             <Route
    //                 path="*"
    //                 element={<Login/>}>
    //             </Route>
    //             </>
    //        }
    //     </Routes>
    // );

    return(
        isAuth 
            ? 
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
            :
            <Routes>
                <Route
                    path="*"
                    element={<Login/>}>
                </Route>
            </Routes>
    )
}

export default AppRouter;