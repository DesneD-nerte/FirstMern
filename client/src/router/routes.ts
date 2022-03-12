import Login from "../pages/Login";
import Main from "../pages/Main";
import Students from "../pages/Students";
import Lessons from "../pages/Lessons";
import Error from "../pages/Error";
import MyProfile from "../pages/MyProfile";
import StudentProfile from "../pages/StudentProfile";
import News from "../pages/News";


export const privateRoutes = [
    {path: '/', component: Main},
    {path: '/lessons', component: Lessons},
    {path: '/news', component: News},
    {path: '/students', component: Students},
    {path: '/myProfile', component: MyProfile},
    {path: '/users/:id', component: StudentProfile},
    {path: '/login', component: Login},
    {path: '/error', component: Error}
]

export const publicRoutes = [
    {path: '/login', component: Login}
]