import {Navigate, Route, Routes} from 'react-router-dom'
import Error from '../pages/Error';
import Login from '../pages/Login';

const AuthRouter = () => {
    return(
        <Routes>
            <Route 
                path="/login"
                element={<Login/>}>
            </Route>
            <Route 
                path="/error"
                element={<Error/>}>
            </Route>
        </Routes>
    );
}

export default AuthRouter;