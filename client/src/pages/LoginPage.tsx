import React from "react";
import Photos from "../components/LoginComponents/Photos";
import LoginForm from "../components/LoginComponents/LoginForm";
import "../styles/Login.css";

const Login = () => {
	return (
		<div className="loginDiv">
			<Photos></Photos>

			<div className="main-modal">
				<LoginForm></LoginForm>
			</div>
		</div>
	);
};

export default Login;
