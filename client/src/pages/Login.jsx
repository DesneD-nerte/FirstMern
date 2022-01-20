import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AuthService from '../services/AuthService';
import { TokenContext } from "../context/tokenContext";

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

    const navigate = useNavigate();

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
        <div>
            <h1>Логин</h1>

            <form onSubmit={loginEnter}>
                <input 
                    value={username}
                    onChange={handleUsernameInput} 
                    type="text" 
                    placeholder="Введите логин">
                </input>
                <input 
                    value={password} 
                    onChange={handlePasswordInput}
                    type="password" 
                    placeholder="Введите пароль">
                </input>
                <button>Войти</button>
            </form>
            
        </div>
    );
}; 

export default Login;