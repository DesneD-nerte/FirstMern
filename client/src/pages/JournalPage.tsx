import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import MenuComponent from "../components/MenuComponent";
import DataGrid from '../components/JournalComponents/DataGrid';
import axios from "axios";
import '../styles/JournalPage.css';
import {Group, Lesson, CurrentLesson, Marks} from '../../types'

type informationType = {
    groups: Array<Group>,
    lessons: Array<Lesson>,
    currentLessons: Array<CurrentLesson>,
    marks: Array<Marks>,
}

const endpoint = process.env.REACT_APP_SERVICE_URI;

const Journal = () => {

    const [currentLesson, setCurrentLesson] = useState('');
    const [currentGroup, setCurrentGroup] = useState('');
    const [currentMarks, setCurrentMarks] = useState<Array<Marks>>([]);

    const [information, setInformation] = useState<informationType>({
        groups: [],
        lessons: [],
        currentLessons: [],
        marks: []
    });

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentLesson(event.target.value as string);
    };

    const handleChangeGroup = (e, newCurrentGroup) => {
        setCurrentGroup(newCurrentGroup);
    };

    useEffect(() => {
        const filteredMarks = information.marks.filter((oneMark, index) => {
            return (oneMark.lesson.name === currentLesson &&
                oneMark.user.groups?.some((oneGroupObject) => oneGroupObject.name === currentGroup));
        })

        setCurrentMarks(filteredMarks);
    }, [currentGroup, currentLesson])

    useEffect(() => {
        const requestGroups = axios.get(`${endpoint}/api/groups`);
        const requestLessons = axios.get(`${endpoint}/api/lessons`);
        const requestCurrentLessons = axios.get(`${endpoint}/api/currentlessons`)
        const requestMarks = axios.get(`${endpoint}/api/marks`)

        axios.all([requestGroups, requestLessons, requestCurrentLessons, requestMarks])
        .then(axios.spread((...response) => {
            const responseGroups= response[0].data;
            const responseLessons = response[1].data;
            const responseCurrentLessons = response[2].data;
            const responseMarks= response[3].data;

            setInformation({
                groups: responseGroups,
                lessons: responseLessons,
                currentLessons: responseCurrentLessons,
                marks: responseMarks,
            })
        }))
        .catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div>
            <MenuComponent></MenuComponent>
            <div className="pageComponent">
                <div className="h1-Text">
                    <h1>Журнал</h1>
                </div>
                <div className="formComponent">

                    <div className="lessonComponent">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" >Предмет</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currentLesson}
                                label="Предмет"
                                onChange={handleChange}
                            >
                            {
                                information.lessons.map((oneLesson: Lesson) => {
                                    return <MenuItem value={oneLesson.name.toString()} key={oneLesson._id as React.Key}>{oneLesson.name}</MenuItem>
                                })
                            }
                            </Select>
                        </FormControl>
                    </div>

                    <div className="groupsComponent">
                        <ToggleButtonGroup value={currentGroup} fullWidth
                            onChange={handleChangeGroup}
                            exclusive>
                            {
                                information.groups.map(oneGroup => {
                                    return <ToggleButton value={oneGroup.name} key={oneGroup._id as React.Key} style={{fontSize: 16}}>{oneGroup.name}</ToggleButton>
                                })
                            }
                        </ToggleButtonGroup>
                    </div>

                    <div>
                        <DataGrid marks={currentMarks}></DataGrid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Journal;