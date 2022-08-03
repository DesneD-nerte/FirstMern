import React, { useState, useContext } from "react";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/authContext";

import { Button, FormControl, OutlinedInput } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeProfileData } from "../store/profileDataReducer";
import "../styles/Login.css";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";

const endpoint = process.env.REACT_APP_SERVICE_URI;

const Login = () => {
    const dispatch = useDispatch();

    const { state, authContext } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleUsernameInput = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    };

    const handleClickShowPassword = (e) => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            loginEnter(e);
        }
    };

    const loginEnter = async (event) => {
        event.preventDefault();

        await AuthService.login(username, password)
            .then((response) => {
                const {
                    _id,
                    username,
                    name,
                    roles,
                    email,
                    imageUri,
                    faculties,
                    departments,
                    groups,
                } = response.data;
                const storeData = {
                    _id,
                    username,
                    name,
                    roles,
                    email,
                    imageUri,
                    faculties,
                    departments,
                    groups,
                };

                dispatch(changeProfileData(storeData));

                authContext.signIn(response.data.token);
            })
            .catch((error) => {
                authContext.signOut();

                if (error.response) {
                    setShowError(true);
                } else if (error.request) {
                    alert("Сервер не отвечает");
                }
            });
    };

    return (
        <div className="loginDiv">
            <div className="photos">
                <div className="photos_column column_1">
                    <div className="column-image">
                        <img
                            src={`${endpoint}/images/House.webp`}
                            alt="House"
                            loading="lazy"
                        ></img>
                    </div>
                    <div className="column-image">
                        <img
                            src={`${endpoint}/images/Sea.webp`}
                            alt="Sea"
                            loading="lazy"
                        ></img>
                    </div>
                </div>
                <div className="photos_column column_2">
                    <div className="column-image">
                        <img
                            src={`${endpoint}/images/Lighthouse.webp`}
                            alt="Lighthouse"
                            loading="lazy"
                        ></img>
                    </div>
                    <div className="column-image">
                        <img
                            src={`${endpoint}/images/DarkLandscape.webp`}
                            alt="DarkLandscape"
                            loading="lazy"
                        ></img>
                    </div>
                </div>
                <div className="photos_column column_3">
                    <div className="column-image">
                        <img
                            src={`${endpoint}/images/Triangles.webp`}
                            alt="Triangles"
                            loading="lazy"
                        ></img>
                    </div>
                    <div className="column-image">
                        <img
                            src={`${endpoint}/images/BlueSea.webp`}
                            alt="BlueSea"
                            loading="lazy"
                        ></img>
                    </div>
                </div>
            </div>

            <div className="main-modal">
                <div className="modal_overlay">
                    <div className="modal_content">
                        <div>
                            <form className="formDiv">
                                <h1 className="login-label">Логин</h1>

                                <FormControl sx={{ width: "100%", marginTop: 2 }}>
                                    <OutlinedInput
                                        value={username}
                                        onChange={handleUsernameInput}
                                        type="text"
                                        placeholder="Введите логин"
                                        onKeyDown={handleSubmit}
                                    />
                                </FormControl>
                                <FormControl
                                    sx={{ width: "100%", marginTop: 1 }}
                                    error={showError}
                                >
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        placeholder="Введите пароль"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={handlePasswordInput}
                                        onKeyDown={handleSubmit}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText
                                        id="component-error-text"
                                        sx={{
                                            visibility:
                                                showError === true ? "visible" : "hidden",
                                        }}
                                    >
                                        Неправильный логин или пароль
                                    </FormHelperText>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    sx={{ width: "100%", marginTop: 3, fontSize: 16 }}
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
