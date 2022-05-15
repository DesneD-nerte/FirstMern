import axios from 'axios';

const endpoint = process.env.REACT_APP_SERVICE_URI;

class AuthService {

    static login (username, password) {
        return axios.post(`${endpoint}/api/auth/login`, {username: username, password: password})
        //.then(response => localStorage.setItem('token', response.data.token))
    }

    static logout () {
        localStorage.removeItem('token'); 
        // return axios.post(`${endpoint}/api/auth/logout`);
    }
}

export default AuthService;