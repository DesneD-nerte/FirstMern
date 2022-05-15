import { Avatar, Button, CircularProgress, Input, MenuItem } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import MenuComponent from '../components/MenuComponent';
import Menu from '@mui/material/Menu';
import "../styles/MyProfile.css";
import { stringAvatar } from '../services/AvatarLetters';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfileData } from '../store/profileDataReducer';
import NestedList from '../components/ProfileComponents/ListLinks';
import {useNavigate, Route, Routes, Navigate} from 'react-router-dom'
import axios from 'axios';

const endpoint = process.env.REACT_APP_SERVICE_URI;

export default function MyProfile() {

	// const myData = useSelector((state) => ({...state.profileData}));
	const myData = useSelector((state) => (state.profileData));

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    //#region Menu 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //#endregion


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('id', myData._id)

        axios.post(`${endpoint}/upload`, data);
        
        setIsLoading(true);
    }

    const handleExcel = (e) => {
        navigate('/addingUsers', {replace: true});
    }

    useEffect(() => {
        if(isLoading === true) {
            axios.get(`${endpoint}/myprofile`)
            .then(response => {
                dispatch(changeProfileData(response.data))
                window.location.reload();
                console.log(response.data);
            })
            .catch(error => {
                // alert(error.response.data.message);
                // setIsAuth(false);
            })
        }
    }, [isLoading])

    return(
        <div className='wrapperProfile'>
            <MenuComponent></MenuComponent>

            {isLoading 
                ? 
                    <div className='loadingProfile'>
                        <CircularProgress size={100}></CircularProgress>
                    </div>
                :
                    <div className='mainBoard'>
                        <div className='info'>
                            <div className='avatar'>
                                <Avatar alt="user" {...stringAvatar(myData.name)} src={myData.imageUri} sx={{width: 225, height: 225}}></Avatar>
                            </div>
                            <div className='myData'>
                                <div className='oneProperty'>
                                    <p className='propertyName'><strong>Пользователь: </strong></p>
                                    {myData.name}</div>
                                {
                                    myData.faculties.length !== 0 &&
                                    <div className='oneProperty'>
                                        <p className='propertyName'><strong>Факультет: </strong></p>
                                        {myData.faculties.map((item) => item.name + ' ')}
                                    </div>
                                }
                                {
                                    myData.departments.length !== 0 &&
                                    <div className='oneProperty'>
                                        <p className='propertyName'><strong>Кафедра: </strong></p>
                                        {myData.departments.map((item) => item.name + ' ')}
                                    </div>
                                }
                                {
                                    myData.groups.length !== 0 &&
                                    <div className='oneProperty'>
                                        <p className='propertyName'><strong>Группа: </strong></p>
                                        {myData.groups.map((item) => item.name + ' ')}
                                    </div>
                                }
                                <div className='oneProperty'>
                                    <p className='propertyName'><strong>Статус: </strong></p>
                                    {myData.roles.map((item) => item.value + ' ')}
                                </div>
                            </div>
                            {/* <div> */}
                                <Button 
                                    id='options-Button'
                                    aria-controls='demo-customized-menu'
                                    variant='contained'
                                    onClick={handleClick}
                                >
                                    Настройки
                                </Button>
                                <Menu 
                                    id='options-Menu'
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": "options-Button"
                                    }}
                                >
                                    <MenuItem type='file' style={{padding: 0, justifyContent: 'center'}}>
                                        <label htmlFor="upload-photo" style={{width: '100%'}}>
                                            <Input type="file"
                                                id="upload-photo"
                                                name="upload-photo"
                                                style={{display: "none"}}
                                                onChange={handleSubmit}>
                                            </Input>
                                            <Button component="span" style={{padding: '5px 15px 5px 15px', width: '100%'}}>
                                                Изменить аватар
                                            </Button>{" "}
                                        </label>
                                    </MenuItem>
                                    <MenuItem style={{padding: 0, justifyContent: 'center'}}>
                                        <Button onClick={handleExcel} style={{padding: '5px 15px 5px 15px', width: '100%'}}>
                                            Зарегистрировать пользователей
                                        </Button>{" "}
                                    </MenuItem>

                                    <MenuItem style={{padding: 0, justifyContent: 'center'}}>
                                        <Button component="span" style={{padding: '5px 15px 5px 15px', width: '100%'}}>
                                            Выход
                                        </Button>{" "}
                                    </MenuItem>
                                </Menu>
                            {/* </div>  */}
                        </div>
                        <NestedList></NestedList>
                    </div>
            }
            
        </div>
    )
}
