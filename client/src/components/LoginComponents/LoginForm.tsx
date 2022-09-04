import React, { useState, useContext } from "react";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/authContext";

import { Button, FormControl, OutlinedInput } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeProfileData } from "../../store/profile/profileDataReducer";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";

const LoginForm = () => {
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

	const loginEnter = async (event) => {
		event.preventDefault();

		await AuthService.login(username, password)
			.then((response) => {
				const storeData = response.data;
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
		<form className="formDiv" onSubmit={loginEnter}>
			<h1 className="login-label">Логин</h1>

			<FormControl sx={{ width: "100%", marginTop: 2 }}>
				<OutlinedInput
					value={username}
					onChange={handleUsernameInput}
					type="text"
					placeholder="Введите логин"
				/>
			</FormControl>
			<FormControl sx={{ width: "100%", marginTop: 1 }} error={showError}>
				<OutlinedInput
					id="outlined-adornment-password"
					placeholder="Введите пароль"
					type={showPassword ? "text" : "password"}
					value={password}
					onChange={handlePasswordInput}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
				<FormHelperText
					id="component-error-text"
					sx={{
						visibility: showError === true ? "visible" : "hidden",
					}}
				>
					Неправильный логин или пароль
				</FormHelperText>
			</FormControl>

			<Button
				variant="contained"
				sx={{ width: "100%", marginTop: 3, fontSize: 16 }}
				type={"submit"}
			>
				Войти
			</Button>
		</form>
	);
};

export default LoginForm;
