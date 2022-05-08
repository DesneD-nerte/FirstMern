import MenuComponent from "../components/MenuComponent";
import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import ruMessages from "devextreme/localization/messages/ru.json";
import React, { useEffect, useState, useContext } from "react";
import { TokenContext } from "../context/tokenContext";
import $api from "../http";
import { loadMessages, locale } from "devextreme/localization";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from '@mui/material';

import DxButtom from "devextreme/ui/button";
import axios from "axios";

import Appointment from '../components/LessonsComponents/Appointment';
import notify from 'devextreme/ui/notify';
import { changeInformationData } from "../store/informationReducer";
import SchedulerComponent from '../components/LessonsComponents/SchedulerComponent';

const currentDate = new Date();
const Lessons = () => {

	const information = useSelector((state) => ({...state.informationData}));
    const dispatch = useDispatch();

    loadMessages(ruMessages);
    locale(navigator.language);

	const [currentLessons, setCurrentLessons] = useState();//[]

    // useEffect(() => {
    //     $api.post('http://localhost:5000/api/currentlessons/savenewcurrentlesson', {})
    // }, [currentLessons])

    useEffect(() => { 


        const requestTeachers = $api.get('http://localhost:5000/api/users/teachers/');
        const requestAudiences = $api.get('http://localhost:5000/api/audiences/');
        const requestLessonsNames = $api.get('http://localhost:5000/api/lessons/');
        const requestGroups = $api.get('http://localhost:5000/api/groups/');

        axios.all([requestTeachers, requestAudiences, requestLessonsNames, requestGroups])
        .then(axios.spread((...response) => {
            const responseTeachers = response[0];
            const responseAudiences = response[1];
            const responseLessonsNames = response[2];
            const responseGroups= response[3];

            let newArrayTeachers = [];
            for (const oneTeacher of responseTeachers.data) {
                newArrayTeachers.push({id: oneTeacher._id, text: oneTeacher.name, email: oneTeacher.email});
            }

            let newArrayAudiences = [];
            for (const oneAudience of responseAudiences.data) {
                newArrayAudiences.push({id: oneAudience._id, text: oneAudience.name});
            }

            let newArrayLessonsNames = [];
            for (const oneLessonName of responseLessonsNames.data) {
                newArrayLessonsNames.push({id: oneLessonName._id, text: oneLessonName.name});
            }

            let newArrayGroups = [];
            for (const oneGroup of responseGroups.data) {
                newArrayGroups.push({id: oneGroup._id, text: oneGroup.name});
            }

            dispatch(changeInformationData({
                teachers: newArrayTeachers,
                audiences: newArrayAudiences, 
                lessonsName: newArrayLessonsNames,
                groups: newArrayGroups})
            );

        }))
        .catch(error => {
            console.log(error);
        })

        $api.get('http://localhost:5000/api/currentlessons')
        .then(response => {
            const responseArrayLessons = response.data;
            const newCurrentLessons = [];

            for (const oneLesson of responseArrayLessons) {
                newCurrentLessons.push({
                    _id: oneLesson._id,
                    classRoomId: oneLesson.classroom._id,
                    endDate: new Date(oneLesson.endDate),
                    startDate: new Date(oneLesson.beginDate),
                    teacherId: [oneLesson.teacher._id],
                    text: oneLesson.name.name,
                    lessonNameId: oneLesson.name._id,
                    groupId: oneLesson.group._id
                    // allDay: false
                })
            }

            setCurrentLessons(newCurrentLessons);
        })
    }, [])

    return(
        <div>
            <MenuComponent></MenuComponent>
            {
                currentLessons !== undefined && information !== undefined
                ?
                <SchedulerComponent information={information} currentLessons={currentLessons}></SchedulerComponent>
                :
                <div className='loadingProfile'>
                    <CircularProgress size={100}></CircularProgress>
                </div>
            }
        </div>
    );
};

export default Lessons;