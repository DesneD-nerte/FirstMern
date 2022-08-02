import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoleService from "../../services/RoleService";
import { RootState } from "../../store";

const endpoint = process.env.REACT_APP_SERVICE_URI;

function SettingsPanel() {
    const myData = useSelector((state: RootState) => state.profileData);

    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExcel = (e) => {
        navigate("/addingUsers", { replace: true });
    };

    // useEffect(() => {
    //     if (isLoading === true) {
    //         axios.get(`${endpoint}/myprofile`).then((response) => {
    //             dispatch(changeProfileData(response.data));
    //             window.location.reload();
    //             console.log(response.data);
    //         });
    //     }
    // }, [isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("id", myData._id);

        axios.post(`${endpoint}/upload`, data).then((response) => {
            setIsLoading(true);
        });
    };

    return (
        <div className="settingsContainer">
            <Button
                id="options-Button"
                aria-controls="demo-customized-menu"
                variant="contained"
                onClick={handleClick}
            >
                Настройки
            </Button>
            <Menu
                id="options-Menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "options-Button",
                }}
            >
                <MenuItem
                    href="https://www.youtube.com/channel/UCb6AZy0_D1y661PMZck3jOw"
                    type="file"
                    style={{
                        padding: 0,
                        justifyContent: "center",
                    }}
                >
                    <label htmlFor="upload-photo" style={{ width: "100%" }}>
                        <Input
                            type="file"
                            id="upload-photo"
                            name="upload-photo"
                            style={{ display: "none" }}
                            onChange={handleSubmit}
                        ></Input>
                        <Button
                            component="span"
                            style={{
                                padding: "5px 15px 5px 15px",
                                width: "100%",
                            }}
                        >
                            Изменить аватар
                        </Button>{" "}
                    </label>
                </MenuItem>
                {RoleService.CheckAdminRole(myData.roles) && (
                    <MenuItem
                        style={{
                            padding: 0,
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            onClick={handleExcel}
                            style={{
                                padding: "5px 15px 5px 15px",
                                width: "100%",
                            }}
                        >
                            Зарегистрировать пользователей
                        </Button>{" "}
                    </MenuItem>
                )}

                <MenuItem
                    style={{
                        padding: 0,
                        justifyContent: "center",
                    }}
                >
                    <Button
                        component="span"
                        style={{
                            padding: "5px 15px 5px 15px",
                            width: "100%",
                        }}
                    >
                        Выход
                    </Button>{" "}
                </MenuItem>
            </Menu>
        </div>
    );
}

export default SettingsPanel;
