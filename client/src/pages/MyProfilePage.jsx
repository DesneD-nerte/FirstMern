import { Avatar, Button, CircularProgress, Input, MenuItem, Menu } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../styles/MyProfile.css";
import { stringAvatar } from "../services/AvatarLetters";
import { useDispatch, useSelector } from "react-redux";
import { changeProfileData } from "../store/profileDataReducer";
import ListLinks from "../components/ProfileComponents/ListLinks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoleService from "../services/RoleService";
import SettingsPanel from "../components/ProfileComponents/SettingsPanel";

const endpoint = process.env.REACT_APP_SERVICE_URI;

export default function MyProfile() {
    // const myData = useSelector((state) => ({...state.profileData}));
    const myData = useSelector((state) => state.profileData);

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const data = new FormData();
    //     data.append("file", e.target.files[0]);
    //     data.append("id", myData._id);

    //     axios.post(`${endpoint}/upload`, data).then((response) => {
    //         setIsLoading(true);
    //     });
    // };

    // useEffect(() => {
    //     if (isLoading === true) {
    //         axios.get(`${endpoint}/myprofile`).then((response) => {
    //             dispatch(changeProfileData(response.data));
    //             window.location.reload();
    //             console.log(response.data);
    //         });
    //     }
    // }, [isLoading]);

    return (
        <div className="wrapperProfile">
            {isLoading ? (
                <div className="loadingProfile">
                    <CircularProgress size={100}></CircularProgress>
                </div>
            ) : (
                <div className="mainBoard">
                    <div className="info">
                        <div className="avatar">
                            <Avatar
                                alt="user"
                                {...stringAvatar(myData.name)}
                                src={myData.imageUri}
                                sx={{ width: 225, height: 225 }}
                            ></Avatar>
                        </div>
                        <div className="myData">
                            <div className="oneProperty">
                                <p className="propertyName">
                                    <strong>Пользователь: </strong>
                                </p>
                                {myData.name}
                            </div>
                            {myData.faculties.length !== 0 && (
                                <div className="oneProperty">
                                    <p className="propertyName">
                                        <strong>Факультет: </strong>
                                    </p>
                                    {myData.faculties.map((item) => item.name + " ")}
                                </div>
                            )}
                            {myData.departments.length !== 0 && (
                                <div className="oneProperty">
                                    <p className="propertyName">
                                        <strong>Кафедра: </strong>
                                    </p>
                                    {myData.departments.map((item) => item.name + " ")}
                                </div>
                            )}
                            {myData.groups.length !== 0 && (
                                <div className="oneProperty">
                                    <p className="propertyName">
                                        <strong>Группа: </strong>
                                    </p>
                                    {myData.groups.map((item) => item.name + " ")}
                                </div>
                            )}
                            <div className="oneProperty">
                                <p className="propertyName">
                                    <strong>Статус: </strong>
                                </p>
                                {myData.roles.map((item) => item.value + " ")}
                            </div>
                        </div>
                        <SettingsPanel />
                    </div>
                    <ListLinks></ListLinks>
                </div>
            )}
        </div>
    );
}
