import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import StudentsPage from "../pages/StudentsPage";
import LessonsPage from "../pages/LessonsPage";
import ErrorPage from "../pages/ErrorPage";
import MyProfilePage from "../pages/MyProfilePage";
import StudentProfilePage from "../pages/StudentProfilePage";
import NewsPage from "../pages/NewsPage";
import AddingPage from "../pages/AddingPage";
import JournalPage from '../pages/JournalPage';

export const privateRoutes = [
    {path: '/', component: LessonsPage},
    {path: '/lessons', component: LessonsPage},
    {path: '/news', component: NewsPage},
    {path: '/journal', component: JournalPage},
    {path: '/myProfile', component: MyProfilePage},
    {path: '/users/:id', component: StudentProfilePage},
    // {path: '/admin', component: AdminPage},
    {path: '/login', component: LoginPage},
    {path: '/error', component: ErrorPage},
    // {path: '/addingUsers', component: AddingPage},
]

export const adminRoutes = [
    {path: '/addingUsers', component: AddingPage},
]

export const publicRoutes = [
    {path: '/login', component: LoginPage}
]