import {useNavigate, Route, Routes, Navigate} from 'react-router-dom'
import LoginPage from "../pages/LoginPage";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { adminRoutes, privateRoutes } from '../router/routes';
import RequestIncerceptor from '../http/RequestInterceptor';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import RoleService from '../services/RoleService';

const AppRouter = () => {
    const myData = useSelector((state: RootState) => ({...state.profileData}))

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
                    {
                        RoleService.CheckAdminRole(myData.roles) &&
                        adminRoutes.map(route => 
                            <Route
                                path={route.path}
                                element={<route.component/>}
                                key={route.path}>
                            </Route>    
                        )
                    }
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