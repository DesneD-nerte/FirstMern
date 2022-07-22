import axios from 'axios';

const endpoint = process.env.REACT_APP_SERVICE_URI;

class AuthService {

    static login (username, password) {
        return axios.post(`${endpoint}/api/auth/login`, {username: username, password: password})
    }

    static logout () {
        localStorage.removeItem('token'); 
    }
}

export default AuthService;