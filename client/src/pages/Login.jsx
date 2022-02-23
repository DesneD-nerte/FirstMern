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

    const loginEnter = async (event) => {
        event.preventDefault();

        await AuthService.login(username, password)
        .then(response => {
            setIsAuth(true);
            setUsername('');
            setPassword('');
        })
        .catch(error => {
            setIsAuth(false);
            alert("Неправильный логин или пароль");
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