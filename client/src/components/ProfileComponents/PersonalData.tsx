import React from "react";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../services/AvatarLetters";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function PersonalData() {
    const { myData } = useSelector((state: RootState) => state.profileData);

    return (
        <>
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
        </>
    );
}

export default PersonalData;
