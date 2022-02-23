import { useContext } from "react";
import { TokenContext } from "../context/tokenContext";
import $api from "../http";

    // const requestOptions = {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({username: username, password: password})
    // }

    // fetch("http://localhost:5000/api/auth/login", requestOptions)
    // .then(responseJson => responseJson.json())
    // .then(dataJson => console.log(dataJson));

class AuthService {

    static login (username, password) {
        return $api.post("http://localhost:5000/api/auth/login", {username: username, password: password})
        .then(response => localStorage.setItem('token', response.data.token))
    }

    static logout () {
        localStorage.removeItem('token'); 
        // return $api.post("http://localhost:5000/api/auth/logout");
    }
}

export default AuthService;