import MenuComponent from "../components/MenuComponent";
import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import ruMessages from "devextreme/localization/messages/ru.json";
import React, { useEffect, useState, useContext } from "react";
import { TokenContext } from "../context/tokenContext";
import $api from "../http";
import { loadMessages, locale } from "devextreme/localization";
import { useDispatch, useSelector } from "react-redux";

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

	const [currentLessons, setCurrentLessons] = useState([])

	// useEffect(() => {

    //     const requestTeachers = $api.get('http://localhost:5000/api/users/teachers/');
    //     const requestAudiences = $api.get('http://localhost:5000/api/audiences/');
    //     const requestLessonsNames = $api.get('http://localhost:5000/api/lessons/');

    //     axios.all([requestTeachers, requestAudiences, requestLessonsNames])
    //     .then(axios.spread((...response) => {
    //         const responseTeachers = response[0];
    //         const responseAudiences = response[1];
    //         const requestLessonsNames = response[2];

    //         let newArrayTeachers = [];
    //         for (const oneTeacher of responseTeachers.data) {
    //             newArrayTeachers.push({id: oneTeacher._id, text: oneTeacher.name, email: oneTeacher.email});
    //         }

    //         let newArrayAudiences = [];
    //         for (const oneAudience of responseAudiences.data) {
    //             newArrayAudiences.push({id: oneAudience._id, text: oneAudience.name});
    //         }

    //         let newArrayLessonsNames = [];
    //         for (const oneLessonName of requestLessonsNames.data) {
    //             newArrayLessonsNames.push({id: oneLessonName._id, text: oneLessonName.name});
    //         }

    //         // setInformation({
    //         //     teachers: newArrayTeachers,
    //         //     audiences: newArrayAudiences,
    //         //     lessonsName: newArrayLessonsNames
    //         // })

    //         if(information.teachers.length !== newArrayTeachers.length ||
    //             information.lessonsName.length !== newArrayLessonsNames.length ||
    //             information.audiences.length !== newArrayAudiences.length) {

    //             dispatch(changeInformationData(({
    //                 teachers: newArrayTeachers,
    //                 audiences: newArrayAudiences, 
    //                 lessonsName: newArrayLessonsNames})));
                
    //             window.location.reload();
    //         }
    //     }))
    //     .catch(error => {
    //         console.log(error);
    //     })
	// }, [])

    // useEffect(() => {
    //     $api.post('http://localhost:5000/api/currentlessons/savenewcurrentlesson', {})
    // }, [currentLessons])

    useEffect(() => { 
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
            <SchedulerComponent information={information} currentLessons={currentLessons}></SchedulerComponent>
        </div>
    );
};

export default Lessons;