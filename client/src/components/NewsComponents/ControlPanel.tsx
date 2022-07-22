import {
    Button,
    FormControlLabel,
    Switch,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import "../../styles/ControlPanel.css";
import axios from "axios";
import { useSelector } from "react-redux";
import RoleService from "../../services/RoleService";
import { RootState } from "../../store";

const endpoint = process.env.REACT_APP_SERVICE_URI;

const ControlPanel = ({
    arrayToDelete,
    filter,
    setFilter,
    limit,
    setLimit,
    deleteMode,
    setDeleteMode,
    setModal,
}) => {
    const myData = useSelector((state: RootState) => ({ ...state.profileData }));

    const handleChange = (event, newLimit) => {
        if (newLimit !== null) {
            setLimit(newLimit);
        }
    };

    const handleDelete = () => {
        axios
            .delete(`${endpoint}/news/deletenews`, { data: { oldNews: arrayToDelete } })
            .then((response) => {
                setDeleteMode(false);
            });
    };

    const handleSwitchButton = () => {
        setDeleteMode(!deleteMode);
    };

    return (
        <div className="panelComponent">
            <div className="mainPanelContainer">
                <TextField
                    style={{ width: "85%", alignSelf: "center" }}
                    value={filter.query}
                    onChange={(e) => setFilter({ ...filter, query: e.target.value })}
                    id="input-with-icon-textfield"
                    label="Поиск"
                    disabled={deleteMode}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
                <div className="mainPanelLimitOptions">
                    <label>Показывать по:</label>
                    <ToggleButtonGroup
                        value={limit}
                        onChange={handleChange}
                        color="primary"
                        style={{ marginTop: 10 }}
                        exclusive
                        fullWidth
                        disabled={deleteMode}
                    >
                        <ToggleButton value={5}>5</ToggleButton>
                        <ToggleButton value={10}>10</ToggleButton>
                        <ToggleButton value={25}>25</ToggleButton>
                    </ToggleButtonGroup>
                </div>

                {RoleService.CheckControlRolePanel(myData.roles) && (
                    <div className="controlRolesContainer">
                        <div className="deleteContainer">
                            <FormControlLabel
                                control={
                                    <Switch
                                        value={deleteMode}
                                        checked={deleteMode}
                                        onChange={handleSwitchButton}
                                    />
                                }
                                label="Режим удаления"
                            />
                            <Button
                                variant="contained"
                                onClick={handleDelete}
                                disabled={!deleteMode}
                            >
                                Удалить выделенное
                            </Button>
                        </div>

                        <div className="buttonAddNews">
                            <Button
                                variant="contained"
                                disabled={deleteMode}
                                onClick={() => setModal(true)}
                            >
                                Добавить новость
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ControlPanel;
