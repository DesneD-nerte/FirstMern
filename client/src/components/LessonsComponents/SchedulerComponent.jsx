import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import ruMessages from "devextreme/localization/messages/ru.json";
import React, { useEffect, useState, useContext } from "react";
import { loadMessages, locale } from "devextreme/localization";
import { useDispatch, useSelector } from "react-redux";

import DxButtom from "devextreme/ui/button";

import Appointment from './Appointment';
import notify from 'devextreme/ui/notify';
import $api from '../../http';

import LessonService from '../../services/LessonService';

const currentDate = new Date();
const SchedulerComponent = ({information, currentLessons}) => {
    loadMessages(ruMessages);
    locale(navigator.language);

    const onAppointmentFormOpeningAction = (e) => {
        const form = e.form;
        let mainGroupitems = form.itemOption('mainGroup').items;
        form.itemOption("mainGroupitems.allDay", "visible", false);
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
                        }
                    }
                }
            }};
        form.itemOption('mainGroup', 'items', mainGroupitems);
    }

    const checkFormFields = (data) => {
        const formData = data.appointmentData || data.newData;
        if(formData.teacherId === undefined ||
            formData.classRoomId === undefined ||
            formData.lessonNameId === undefined ||
            formData.groupId === undefined) {
                data.cancel = true;
                notify('Заполните все данные', 'warning', 1000);
        }

        $api.put('http://localhost:5000/api/currentlessons/updateCurrentLesson', formData);
    }

    const views = [{
        type: 'agenda'
    },
    {
        type: 'month'
    },
    {
        type: 'week'
    },
    {
        type: 'day'
    }];

    const timeRange = [15, 30, 60];
    const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange[1]);
    const [currentView, setCurrentView] = useState('agenda');
    let firstTime = true;

    const saveNewCurrentLesson = async (e) => {
        const {appointmentData} = e;
        console.log(appointmentData);

        if(!appointmentData.recurrenceRule) {
            const newCurrentLesson = await (await($api.post('http://localhost:5000/api/currentlessons/savenewcurrentlesson', appointmentData))).data;
            $api.post('http://localhost:5000/api/marks/savenewcurrentlesson', {appointmentData, newCurrentLesson});
        } else {
            const newCurrentLessonsArray = await LessonService.addArrayLessons(appointmentData);
            console.log(newCurrentLessonsArray);
            $api.post('http://localhost:5000/api/marks/savenewcurrentlessonsarray', {appointmentData, newCurrentLessonsArray});
        }
    }

    return(
        <Scheduler
            dataSource={currentLessons}
            cellDuration={selectedTimeRange}
            defaultCurrentView='month'
            defaultCurrentDate={currentDate}
            views={views}
            startDayHour={8}
            endDayHour={22}
            onAppointmentUpdating={checkFormFields}
            onAppointmentAdding={checkFormFields}
            onAppointmentFormOpening={onAppointmentFormOpeningAction}
            appointmentComponent={e => Appointment(e, information.teachers, information.audiences)}
            onAppointmentAdded={saveNewCurrentLesson}
            onCurrentViewChange={(view) => setCurrentView(view)}
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
            <Resource
                dataSource={information.groups}
                fieldExpr="groupId"
                label="Группа">
            </Resource>
        </Scheduler>
    );
};

export default SchedulerComponent;