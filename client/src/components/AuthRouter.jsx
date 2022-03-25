import {Navigate, Route, Routes} from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';

const AuthRouter = () => {
    return(
        <Routes>
            <Route 
                path="/login"
                element={<LoginPage/>}>
            </Route>
            <Route 
                path="/error"
                element={<ErrorPage/>}>
            </Route>
        </Routes>
    );
}

export default AuthRouter;