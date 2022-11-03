import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DataGrid from "../components/JournalComponents/DataGrid";
import "../styles/JournalPage.css";
import { Lesson, Marks } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loadJournalInformation } from "../store/journal/journalThunks";

const endpoint = process.env.REACT_APP_SERVICE_URI;

const Journal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [currentLesson, setCurrentLesson] = useState("");
    const [currentGroup, setCurrentGroup] = useState("");
    const [currentMarks, setCurrentMarks] = useState<Array<Marks>>([]);

    const { groups, lessons, currentLessons, marks } = useSelector((state: RootState) => state.journalData);

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentLesson(event.target.value as string);
    };

    const handleChangeGroup = (e, newCurrentGroup) => {
        setCurrentGroup(newCurrentGroup);
    };

    useEffect(() => {
        const filteredMarks = marks.filter((oneMark, index) => {
            return (
                oneMark.lesson.name === currentLesson &&
                oneMark.user.groups?.some((oneGroupObject) => oneGroupObject.name === currentGroup)
            );
        });

        setCurrentMarks(filteredMarks);
    }, [currentGroup, currentLesson]);

    useEffect(() => {
        dispatch(loadJournalInformation());
    }, []);

    return (
        <div>
            <div className="pageComponent">
                <div className="h1-text">
                    <h1>Журнал</h1>
                </div>
                <div className="formComponent">
                    <div className="lessonComponent">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Предмет</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currentLesson}
                                label="Предмет"
                                onChange={handleChange}
                            >
                                {lessons.map((oneLesson: Lesson) => {
                                    return (
                                        <MenuItem value={oneLesson.name.toString()} key={oneLesson._id as React.Key}>
                                            {oneLesson.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="groupsComponent">
                        <ToggleButtonGroup value={currentGroup} fullWidth onChange={handleChangeGroup} exclusive>
                            {groups.map((oneGroup) => {
                                return (
                                    <ToggleButton
                                        value={oneGroup.name}
                                        key={oneGroup._id as React.Key}
                                        style={{ fontSize: 16 }}
                                    >
                                        {oneGroup.name}
                                    </ToggleButton>
                                );
                            })}
                        </ToggleButtonGroup>
                    </div>

                    <div>
                        <DataGrid marks={currentMarks}></DataGrid>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Journal;
