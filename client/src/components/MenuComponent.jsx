import React from 'react';
import Button from '@mui/material/Button';
import '../styles/MenuComponent.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../context/tokenContext';

export default function MenuComponent() {
	const {isAuth, setIsAuth, isLoading} = useContext(TokenContext);
	const navigate = useNavigate();

	const schedule = (event) => {
		navigate('/lessons');
	}
	
	const journal = (event) => {
		navigate('/journal');
	}

	const news = (event) => {
		navigate('/news');
	}
	
	const myProfile = (event) => {
		navigate('/myProfile');
	}
	
	const logOut = (event) => {
		localStorage.removeItem('token');
		// localStorage.clear();
		setIsAuth(false);
	}

	return (
		<div className='wrapperMenu'>
			<div className='elementsMenu'>
				<Button onClick={schedule}>Расписание</Button>
				<Button onClick={journal}>Журнал посещений</Button>
				<Button onClick={news}>Лента новостей</Button>
				<Button onClick={myProfile}>Личный кабинет</Button>

				<Button onClick={logOut}>Выйти</Button>
			</div>
		</div>
	)
}
