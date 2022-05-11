import { useContext } from "react";
import { TokenContext } from "../context/tokenContext";
import $api from "../http";

const endpoint = process.env.REACT_APP_SERVICE_URI;

class AuthService {

    static login (username, password) {
        return $api.post(`${endpoint}/api/auth/login`, {username: username, password: password})
        //.then(response => localStorage.setItem('token', response.data.token))
    }

    static logout () {
        localStorage.removeItem('token'); 
        // return $api.post(`${endpoint}/api/auth/logout`);
    }
}

export default AuthService;