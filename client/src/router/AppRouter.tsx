import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { adminRoutes, privateRoutes } from "./routes";
import RequestIncerceptor from "../http/RequestInterceptor";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import RoleService from "../services/RoleService";
import WrapperMenu from "../components/WrapperMenu";
import React from "react";

const AppRouter = () => {
    const myData = useSelector((state: RootState) => ({
        ...state.profileData,
    }));

    const { state } = useContext(AuthContext);

    return state.isAuth ? (
        <RequestIncerceptor>
            <Routes>
                {privateRoutes.map((route) => (
                    <Route
                        path={route.path}
                        element={
                            <WrapperMenu>
                                <route.component />
                            </WrapperMenu>
                        }
                        key={route.path}
                    ></Route>
                ))}
                {RoleService.CheckAdminRole(myData.roles) &&
                    adminRoutes.map((route) => (
                        <Route
                            path={route.path}
                            element={
                                <WrapperMenu>
                                    <route.component />
                                </WrapperMenu>
                            }
                            key={route.path}
                        ></Route>
                    ))}
                <Route
                    path="*"
                    element={<Navigate to="/error" replace></Navigate>}
                    key="*"
                ></Route>
            </Routes>
        </RequestIncerceptor>
    ) : (
        <Routes>
            <Route path="*" element={<LoginPage />}></Route>
        </Routes>
    );
};

export default AppRouter;
