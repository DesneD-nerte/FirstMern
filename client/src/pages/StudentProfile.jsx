import { Avatar, Button, CircularProgress, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
  
import MenuComponent from '../components/MenuComponent';
import Menu from '@mui/material/Menu';
import $api from '../http';
import "../styles/MyProfile.css";

//#region Разный цвет на основе букв
function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
}

function stringAvatar(nameAndSurname) { 
    const name = nameAndSurname.nameAndSurname;
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 100,
            height: 100,
            fontSize: 40
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
//#endregion

export default function StudentProfile() { //{nameAndSurname, role}//string: Alex Ershov, string: role

    const [isLoading, setIsLoading] = useState(true);
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [roles, setRoles] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let { id } = useParams();

    useEffect(() => {
        $api.get(`http://localhost:5000/api/users/students/${id}`)
        .then(response => {
                setNameAndSurname(response.data.name);
                setRoles(response.data.roles);
                setIsLoading(false);
            })
    }, [])

    return(
        <div className='wrapperProfile'>
            <MenuComponent></MenuComponent>

            {isLoading 
                ? 
                    <div className='loading'>
                        <CircularProgress></CircularProgress>
                    </div>
                :
                    <div className='mainBoard'>
                        <div className='info'>
                            <div className='avatar'>
                                <Avatar alt="user" {...stringAvatar({nameAndSurname})}></Avatar>
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
                                <MenuItem onClick={handleClose}>Edit</MenuItem>
                                <MenuItem onClick={handleClose}>More</MenuItem>
                            </Menu>
                        </div>
                    </div>
            }
        </div>
    )
}
