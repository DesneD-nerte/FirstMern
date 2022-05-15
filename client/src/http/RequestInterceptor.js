import { useContext, useEffect, useMemo } from 'react'
import axios from 'axios'
import { AuthContext } from "../context/authContext";

const RequestIncerceptor = ({ children }) => {
    const { authContext } = useContext(AuthContext);
    const { signIn, signOut } = authContext;

    useEffect(() => {
        axios.interceptors.request.use(config => {
            const token = localStorage.getItem('token')
            config.headers.Authorization = token;
        
            return config;
        }, error => {

            return Promise.reject(error);
        })
    }, [])

   
    useEffect(() => {
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
                if(error.response.status == 401) {
                    signOut();
                }

                return Promise.reject(error);
            }
        )
    }, [])

    return children
}

export default RequestIncerceptor