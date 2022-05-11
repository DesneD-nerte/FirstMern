import { useState, useContext, useEffect } from "react";
import AuthService from '../services/AuthService';
import { TokenContext } from "../context/tokenContext";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeProfileData } from "../store/profileDataReducer";
import '../styles/Login.css';

const endpoint = process.env.REACT_APP_SERVICE_URI;

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
    }

    return(
        <div className="loginDiv">
            <div className="photos">
                <div className="photos_column column_1">
                    <div className="column-image">
                        <img src={`${endpoint}/images/House.webp`} alt="image" loading="lazy"></img>
                    </div>
                    <div className="column-image">
                        <img sr={`${endpoint}/images/Sea.webp`} alt="image" loading="lazy"></img>
                    </div>
                </div>
                <div className="photos_column column_2">
                    <div className="column-image">
                        <img src={`${endpoint}/images/Lighthouse.webp`} alt="image" loading="lazy"></img>
                    </div>
                    <div className="column-image">
                        <img src={`${endpoint}/images/DarkLandscape.webp`} alt="image" loading="lazy"></img>
                    </div>
                </div>
                <div className="photos_column column_3">
                    <div className="column-image">
                        <img src={`${endpoint}/images/Triangles.webp`} alt="image" loading="lazy"></img>
                    </div>
                    <div className="column-image">
                        <img src={`${endpoint}/images/BlueSea.webp`} alt="image" loading="lazy"></img>
                    </div>
                </div>
            </div>

            <div className="main-modal">
                <div className="modal_overlay">
                    <div className="modal_content">
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