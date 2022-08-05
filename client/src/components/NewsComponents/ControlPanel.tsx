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
import React, { useState } from "react";
import "../../styles/ControlPanel.css";
import { useDispatch, useSelector } from "react-redux";
import RoleService from "../../services/RoleService";
import { AppDispatch, RootState } from "../../store";
import {
    setFilterNews,
    setLimitNews,
    setPageNews,
} from "../../store/news/newsData/newsReducer";
import CreateNews from "./CreateNews";
import { changeDeleteMode } from "../../store/news/newsDelete/newsDeleteReducer";
import { DeleteNews } from "../../store/news/newsDelete/newsDeleteThunk";

const endpoint = process.env.REACT_APP_SERVICE_URI;

const ControlPanel = () => {
    const { myData } = useSelector((state: RootState) => state.profileData);
    const { limit, page, range, filter } = useSelector(
        (state: RootState) => state.newsData
    );
    const { newsDelete, deleteMode } = useSelector(
        (state: RootState) => state.newsDeleteData
    );

    const dispatch = useDispatch<AppDispatch>();

    const [openCreatingNews, setOpenCreatingNews] = useState(false);

    const handleChangeInput = (e) => {
        dispatch(setFilterNews(e.target.value));
    };

    const handleChangeLimit = (e, newLimit) => {
        if (Math.ceil(range / limit) == page) {
            dispatch(setPageNews(Math.ceil(range / newLimit)));
        }
        if (newLimit !== null) {
            dispatch(setLimitNews(newLimit));
        }
    };

    const handleAddNews = () => {
        setOpenCreatingNews(true);
    };

    const handleDelete = () => {
        dispatch(DeleteNews(newsDelete, limit));
    };

    const handleSwitchButton = () => {
        dispatch(changeDeleteMode(!deleteMode));
    };

    return (
        <div className="panelComponent">
            <div className="mainPanelContainer">
                <TextField
                    style={{ width: "85%", alignSelf: "center" }}
                    value={filter.query}
                    onChange={handleChangeInput}
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
                        onChange={handleChangeLimit}
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
                                onClick={handleAddNews}
                            >
                                Добавить новость
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            {openCreatingNews && <CreateNews setVisible={setOpenCreatingNews} />}
        </div>
    );
};

export default ControlPanel;
