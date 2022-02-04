import { Avatar, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MenuComponent from '../components/MenuComponent';
import $api from '../http';

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
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
//#endregion

export default function MyProfile() { //{nameAndSurname, role}//string: Alex Ershov, string: role

    const [isLoading, setIsLoading] = useState(true);
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [roles, setRoles] = useState([]);


    useEffect(() => {
        $api.get(`http://localhost:5000/myprofile`)
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
                    <CircularProgress></CircularProgress>
                :
                    <div className='mainBoard'>
                    <div className='avatar'>
                        <Avatar alt="user" {...stringAvatar({nameAndSurname})}></Avatar>
                    </div>
                    <div className='myData'>
                        <a>Пользователь: {nameAndSurname}</a>
                        <a>Статус: {roles}</a>
                    </div>
                    </div>
            }
            
        </div>
    )
}
