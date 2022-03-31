import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AuthService from '../services/AuthService';
import { TokenContext } from "../context/tokenContext";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeProfileData } from "../store/profileDataReducer";
import '../styles/Login.css';

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

    const loginEnter = async (event) => {
        event.preventDefault();

        await AuthService.login(username, password)
        .then(response => {
            setIsAuth(true);

            const {_id, username, name, roles, email, imageUri} = response.data;
            const storeData = {_id, username, name, roles, email, imageUri};
            console.log(storeData);
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
            <h1>Логин</h1>

            <form className="formDiv">
                <TextField 
                    value={username}
                    onChange={handleUsernameInput} 
                    type="text" 
                    placeholder="Введите логин"
                    onKeyDown={e => {if(e.key ==="Enter") loginEnter(e)}}
                    sx={{width: 450, marginTop: 2}}>
                </TextField>
                <TextField 
                    value={password} 
                    onChange={handlePasswordInput}
                    type="password" 
                    placeholder="Введите пароль"
                    onKeyDown={e => {if(e.key ==="Enter") loginEnter(e)}}
                    sx={{width: 450, marginTop: 1}}>
                </TextField>

                <Button 
                    variant='contained'
                    sx={{width: 150, marginTop: 5, fontSize: 16}}
                    onClick={loginEnter}
                >
                    Войти
                </Button>
            </form>
            
        </div>
    );
}; 

export default Login;