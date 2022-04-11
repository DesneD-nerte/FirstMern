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


const currentDate = new Date();
const Lessons = () => {

	const myData = useSelector((state) => ({...state.informationData}));
    const dispatch = useDispatch();

    loadMessages(ruMessages);
    locale(navigator.language);

    const timeRange = [15, 30, 60];

    const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange[1]);
    const [forceUpdate, setForceUpdate] = useState(false);

    const onAppointmentFormOpeningAction = (e) => {
        const form = e.form;
        let mainGroupitems = form.itemOption('mainGroup').items;
        form.itemOption("mainGroupitems.allDay", "visible", false);
        //form.itemOption("mainGroupitems.repeat", "visible", false);
        mainGroupitems[0] = {colSpan: 2,
            label: {text: "Предмет"}, 
            editorType: "dxSelectBox",
            dataField: 'lessonNameId',
            editorOptions: {items: information.lessonsName,
                displayExpr: 'text',
                valueExpr: 'id',
                onValueChanged(args) {
                    if(args.value) {
                        if(information.lessonsName !== undefined) {
                            form.updateData('text', information.lessonsName.find(lessonName => lessonName.id === args.value).text)
                        } else {
                            form.updateData('text', lessonsName.find(lessonName => lessonName.id === args.value).text)
                        }
                    }
                }
            }};
        form.itemOption('mainGroup', 'items', mainGroupitems);
    }

    const [allowActions, setAllowActions] = useState({
        allowUpdating: true,
        allowAdding: true,
        allowDeleting: true,
        allowResizing: true,
        allowDragging: true,
    })

	const [currentLessons, setCurrentLessons] = useState([  
        // id: '62449b5e8f4866349f18e760',
        // allDay: false,
        // text: 'Physics',
        // lessonNameId: '61fe6a75aacae90772917c46',
		// startDate: new Date(2022, 3, 10, 8, 0),
		// endDate: new Date(2022, 3, 10, 8, 30),
		// teacherId: ['61fe65bca9952e94f6a9321b'],
		// classRoomId: '62449b238f4866349f18e757',
	])

    const [teachers, setTeachers] = useState([{
        id: '1',
        text: 'startTeacher',
        email: 'startEmail'
    }])

    const [lessonsName, setLessonsName] = useState([{
        id: '1',
        text: 'startLesson',
    }
    ])

    const [audiences, setAudiences] = useState([{
        id: '1',
        text: 'startRoom',
    }])

    const [information, setInformation] = useState({
        teachers: [{
            id: '1',
            text: 'startTeacher',
            email: 'startEmail'
        }],
        lessonsName: [{
            id: '1',
            text: 'startLesson',
        }],
        audiences: [{
            id: '1',
            text: 'startRoom'
        }]
    })

    // useEffect(() => {
    //     $api.get('http://localhost:5000/api/currentlessons')
    //     .then(response => {
    //         setCurrentLessons(response.data);
    //     })
    // }, [])

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
    //         setInformation({
    //             teachers: newArrayTeachers,
    //             audiences: newArrayAudiences,
    //             lessonsName: newArrayLessonsNames
    //         })

    //         // information.audiences = newArrayAudiences;
    //         // information.teachers = newArrayTeachers;
    //         // information.lessonsName = newArrayLessonsNames;
    //         // setForceUpdate(!forceUpdate);
    //     }))
    //     .catch(error => {
    //         console.log(error);
    //     })
	// }, [])

    // useEffect(() => { //Без форс апдейта непонятно как Sheduler.resourses получает значение undefined 
    //     // setForceUpdate(!forceUpdate);
    //     $api.get('http://localhost:5000/api/currentlessons')
    //     .then(response => {
    //         const responseLesson = response.data[0];
    //         const newCurrentLesson = [{
    //             classRoomId: responseLesson.classroom._id,
    //             endDate: new Date(responseLesson.endDate),
    //             startDate: new Date(responseLesson.beginDate),
    //             teacherId: responseLesson.teacher._id,
    //             text: responseLesson.name.name,
    //             lessonNameId: responseLesson.name._id,
    //             allDay: false
    //         }]
    //         setCurrentLessons(newCurrentLesson);
    //     })
    // }, [information])
    
    useEffect(() => {
        if(myData.roles.includes('STUDENT') || myData.roles.includes('TEACHER') || myData.roles.includes('RAILWAY')) {
            setAllowActions({
                allowUpdating: false,
                allowAdding: false,
                allowResizing: false,
                allowDeleting: false,
                allowDragging: false,
            })
        }
        if(myData.roles.includes('UNIVERSITY') || myData.roles.includes('ADMIN')) {
            setAllowActions({
                allowUpdating: true,
                allowAdding: true,
                allowResizing: true,
                allowDeleting: true,
                allowDragging: true,
            })
        }

    }, [])

    const checkFormFields = (data) => {
        const formData = data.appointmentData || data.newData;
        if(formData.teacherId === undefined ||
            formData.classRoomId === undefined ||
            formData.lessonNameId === undefined ) {
                data.cancel = true;
                notify('Заполните все данные', 'warning', 1000)
        }
    }

    const saveCurrentLesson = () => {
        $api.post('http://localhost:5000/api/currentlessons/savenewcurrentlesson')
    }

    const views = ['agenda', 'month', 'week', 'day'];
    const [currentView, setCurrentView] = useState('');
    let firstTime = true;

    console.log(currentLessons);

    return(
        <div>
            <MenuComponent></MenuComponent>
            <Scheduler
                dataSource={currentLessons}
                cellDuration={selectedTimeRange}
                defaultCurrentView="agenda"
                defaultCurrentDate={currentDate}
                views={views}
                startDayHour={8}
                endDayHour={22}
                editing={allowActions}
                onContentReady={() => {
                    if(firstTime === true && currentView !== 'agenda' && currentView !== 'month' && currentView !== undefined) {
                        let container0 = document.getElementsByClassName("dx-scheduler-navigator")[0];
                        container0.style.verticalAlign="baseline";

                        let mainContainer = document.getElementsByClassName("dx-toolbar-before")[0];
                        let mainDiv = document.createElement("div");
                        mainDiv.classList.add("d-none", "d-sm-block");
                        mainContainer.appendChild(mainDiv);
                        
                        let element1 = document.createElement("div");
                        mainDiv.appendChild(element1);
                        let instance1 = new DxButtom(element1, {text: '15 минут', focusStateEnabled: false, onClick: () => setSelectedTimeRange(timeRange[0])});
                        
                        let element2 = document.createElement("div");
                        mainDiv.appendChild(element2);
                        let instance2 = new DxButtom(element2, {text: '30 минут', focusStateEnabled: false,  onClick: () => setSelectedTimeRange(timeRange[1])});
                        
                        let element3 = document.createElement("div");
                        mainDiv.appendChild(element3);
                        let instance3 = new DxButtom(element3, {text: '1 час', focusStateEnabled: false, onClick: () => setSelectedTimeRange(timeRange[2])});

                        firstTime = false;
                    } 
                }}
                onAppointmentFormOpening={onAppointmentFormOpeningAction}
                onAppointmentUpdating={checkFormFields}
                onAppointmentAdding={checkFormFields}
                appointmentComponent={e => Appointment(e, information.teachers, information.audiences)}
                //onAppointmentAdded={saveCurrentLesson}
                >
                <Resource
                    dataSource={information.teachers}
                    allowMultiple={true}
                    fieldExpr="teacherId"
                    label="Преподаватель"
                    useColorAsDefault={true}>
                </Resource>
                <Resource
                    dataSource={information.audiences}
                    fieldExpr="classRoomId"
                    label="Аудитория">
                </Resource>
            </Scheduler>
        </div>
    );
};

export default Lessons;