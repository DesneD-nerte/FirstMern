import Login from "../pages/Login";
import Main from "../pages/Main";
import Students from "../pages/Students";
import Lessons from "../components/Output";
import Error from "../pages/Error";

export const privateRoutes = [
    {path: '/', component: Main},
    {path: '/lessons', component: Lessons},
    {path: '/students', component: Students},
    {path: '/error', component: Error}
]

export const publicRoutes = [
    {path: '/login', component: Login}
    //{path: '/registration', component: Login}
]