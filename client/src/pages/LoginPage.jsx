import { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AuthService from '../services/AuthService';
import { TokenContext } from "../context/tokenContext";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeProfileData } from "../store/profileDataReducer";
import '../styles/Login.css';
import { changeInformationData } from "../store/informationReducer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import $api from "../http";

const Login = () => {

    const dispatch = useDispatch();

    const {isAuth, setIsAuth} = useContext(TokenContext);

    const [username, setUsername] = useState('');//string
    const [password, setPassword] = useState('');//number

    const handleUsernameInput = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const loginEnter = async (event) => {//Я не кладу пароль в ответ
        event.preventDefault();

        await AuthService.login(username, password)
        .then(response => {
            setIsAuth(true);

            const {_id, username, name, roles, email, imageUri, faculties, departments, groups} = response.data;
            const storeData = {_id, username, name, roles, email, imageUri, faculties, departments, groups};
            console.log('Login', storeData);
            dispatch(changeProfileData(storeData));

            localStorage.setItem('token', response.data.token)
        })
        .catch(error => {
            setIsAuth(false);
            if(error.response) {
                alert(error.response.data.message);
            } else if (error.request) {
                alert('Сервер не отвечает');
            }
        });

        // const requestTeachers = $api.get('http://localhost:5000/api/users/teachers/');
        // const requestAudiences = $api.get('http://localhost:5000/api/audiences/');
        // const requestLessonsNames = $api.get('http://localhost:5000/api/lessons/');
        // const requestGroups = $api.get('http://localhost:5000/api/groups/');

        // axios.all([requestTeachers, requestAudiences, requestLessonsNames, requestGroups])
        // .then(axios.spread((...response) => {
        //     const responseTeachers = response[0];
        //     const responseAudiences = response[1];
        //     const responseLessonsNames = response[2];
        //     const responseGroups= response[3];

        //     let newArrayTeachers = [];
        //     for (const oneTeacher of responseTeachers.data) {
        //         newArrayTeachers.push({id: oneTeacher._id, text: oneTeacher.name, email: oneTeacher.email});
        //     }

        //     let newArrayAudiences = [];
        //     for (const oneAudience of responseAudiences.data) {
        //         newArrayAudiences.push({id: oneAudience._id, text: oneAudience.name});
        //     }

        //     let newArrayLessonsNames = [];
        //     for (const oneLessonName of responseLessonsNames.data) {
        //         newArrayLessonsNames.push({id: oneLessonName._id, text: oneLessonName.name});
        //     }

        //     let newArrayGroups = [];
        //     for (const oneGroup of responseGroups.data) {
        //         newArrayGroups.push({id: oneGroup._id, text: oneGroup.name});
        //     }

        //     dispatch(changeInformationData({
        //         teachers: newArrayTeachers,
        //         audiences: newArrayAudiences, 
        //         lessonsName: newArrayLessonsNames,
        //         groups: newArrayGroups}));
        // }))
        // .catch(error => {
        //     console.log(error);
        // })
    }

    useEffect( async () => {
        document.body.style.overflow = "hidden";
        //const arrayImages = await $api.get('http://localhost:5000/images');
    }, []);

    return(
        <div className="loginDiv">
            <div className="photos">
                <div className="photos_column">
                    <div className="column-image">
                        <img src="http://localhost:5000/images/House.webp" alt="image" loading="lazy"></img>
                    </div>
                    <div className="column-image">
                        <img src="http://localhost:5000/images/Sea.webp" alt="image" loading="lazy"></img>
                    </div>
                </div>
                <div className="photos_column">
                    <div className="column-image">
                        <img src="http://localhost:5000/images/Lighthouse.webp" alt="image" loading="lazy"></img>
                    </div>
                    <div className="column-image">
                        <img src="http://localhost:5000/images/Triangles.webp" alt="image" loading="lazy"></img>
                    </div>
                </div>
                <div className="photos_column">
                    <div className="column-image">
                        <img src="http://localhost:5000/images/DarkLandscape.webp" alt="image" loading="lazy"></img>
                    </div>
                    <div className="column-image">
                        <img src="http://localhost:5000/images/Wheel.webp" alt="image" loading="lazy"></img>
                    </div>
                </div>
            </div>

            <div className="main-modal">
                <div className="modal_overlay">
                    <div className="modal_content">
                        {/* <div>
                            <AccountCircleIcon></AccountCircleIcon>
                        </div> */}
                        <div>
                            <form className="formDiv">
                                <h1 className="login-label">Логин</h1>

                                <TextField 
                                    value={username}
                                    onChange={handleUsernameInput} 
                                    type="text" 
                                    placeholder="Введите логин"
                                    onKeyDown={e => {if(e.key ==="Enter") loginEnter(e)}}
                                    sx={{width: '100%', marginTop: 2}}>
                                </TextField>
                                <TextField 
                                    value={password} 
                                    onChange={handlePasswordInput}
                                    type="password" 
                                    placeholder="Введите пароль"
                                    onKeyDown={e => {if(e.key ==="Enter") loginEnter(e)}}
                                    sx={{width: '100%', marginTop: 1}}>
                                </TextField>

                                <Button 
                                    variant='contained'
                                    sx={{width: '100%', marginTop: 5, fontSize: 16}}
                                    onClick={loginEnter}
                                >
                                    Войти
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}; 

export default Login;