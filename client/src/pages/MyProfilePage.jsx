import { Avatar, Button, CircularProgress, Input, MenuItem } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import MenuComponent from '../components/MenuComponent';
import { TokenContext } from "../context/tokenContext";
import Menu from '@mui/material/Menu';
import $api from '../http';
import "../styles/MyProfile.css";
import { stringAvatar } from '../services/AvatarLetters';


export default function MyProfile() { //{nameAndSurname, role}//string: Alex Ershov, string: role

    const {isAuth, setIsAuth} = useContext(TokenContext);

    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState();
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [roles, setRoles] = useState([]);
    const [uriImagePath, setUriImagePath] = useState();

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
        data.append('id', id);

        $api.post('http://localhost:5000/upload', data);
        
        window.location.reload();
    }

    useEffect(() => {
        $api.get(`http://localhost:5000/myprofile`)
        .then(response => {
            setId(response.data.id);
            setNameAndSurname(response.data.name);
            setRoles(response.data.roles);

            setUriImagePath(`http://localhost:5000/api/users/${response.data.id}/avatar/${response.data.id}.jpeg`);
            setIsLoading(false);
        })
        .catch(error => {
            alert(error.response.data.message);
            setIsAuth(false);
        })
    }, [])

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
                                <Avatar alt="user" {...stringAvatar({nameAndSurname})} src={uriImagePath} ></Avatar>
                            </div>
                            <div className='myData'>
                                <div>Пользователь: {nameAndSurname}</div>
                                <div>Статус: {roles}</div>
                            </div>
                        </div>
                        <div>
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
                                <MenuItem type='file' style={{padding: 0}}>
                                    <label htmlFor="upload-photo">
                                        <Input type="file"
                                            id="upload-photo"
                                            name="upload-photo"
                                            style={{display: "none"}}
                                            onChange={handleSubmit}>
                                        </Input>
                                        <Button component="span" style={{padding: '5px 15px 5px 15px'}}>
                                            Изменить аватар
                                        </Button>{" "}
                                    </label>
                                </MenuItem>
                                <MenuItem>More</MenuItem>
                            </Menu>
                        </div>
                    </div>
            }
            
        </div>
    )
}
