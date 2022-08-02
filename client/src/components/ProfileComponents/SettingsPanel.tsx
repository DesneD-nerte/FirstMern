import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoleService from "../../services/RoleService";
import { AppDispatch, RootState } from "../../store";
import { updateAndGetProfileData } from "../../store/profileData/profileDataThunks";

function SettingsPanel() {
    const { myData } = useSelector((state: RootState) => state.profileData);

    const dispatch = useDispatch<AppDispatch>();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExcel = (e) => {
        navigate("/addingUsers");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateAndGetProfileData(myData, e));
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
                    href=""
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
