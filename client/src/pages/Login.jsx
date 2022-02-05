import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AuthService from '../services/AuthService';
import { TokenContext } from "../context/tokenContext";
import { Button, TextField } from "@mui/material";
import '../styles/Login.css';

const Login = () => {

    const {isAuth, setIsAuth} = useContext(TokenContext);

    const [username, setUsername] = useState('');//string
    const [password, setPassword] = useState('');//number

    const handleUsernameInput = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    //const navigate = useNavigate();

    const loginEnter = async (event) => {
        event.preventDefault();

        await AuthService.login(username, password);

        console.log(localStorage.getItem('token'));
        
        setUsername('');
        setPassword('');

        setIsAuth(true);
        //navigate('/', {replace: true});
    }

    return(
        <div className="loginDiv">
            <h1>Логин</h1>

            <form className="formDiv" onSubmit={loginEnter}>
                <TextField 
                    value={username}
                    onChange={handleUsernameInput} 
                    type="text" 
                    placeholder="Введите логин"
                    sx={{width: 450, marginTop: 2}}>
                </TextField>
                <TextField 
                    value={password} 
                    onChange={handlePasswordInput}
                    type="password" 
                    placeholder="Введите пароль"
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