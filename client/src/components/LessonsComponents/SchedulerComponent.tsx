import Scheduler, { Resource } from "devextreme-react/scheduler";
import React, { useState } from "react";
import { loadMessages, locale } from "devextreme/localization";
import ruMessages from "devextreme/localization/messages/ru.json";
import Appointment from "./Appointment";
import { useDispatch } from "react-redux";
import TimeButtonsHandler from "./TimeButtonsHandler";
import {
    saveNewCurrentLesson,
    saveNewCurrentLessonsArray,
} from "../../store/lessons/currentLessons/currentLessonsThunks";
import { CurrentLessonScheduler } from "../../../types";
import useScheduler from "../../hooks/useScheduler";

const currentDate = new Date();

const SchedulerComponent = ({ information, currentLessons }) => {
    loadMessages(ruMessages);
    locale("ru");

    const dispatch = useDispatch();

    const [allowActions, onAppointmentFormOpeningAction, checkFormFields] = useScheduler(information);

    const timeRange = [15, 30, 60];
    const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange[1]);
    const [currentView, setCurrentView] = useState("month");
    let firstTime = true;

    const saveCurrentLesson = (e) => {
        const appointmentData: CurrentLessonScheduler = e.appointmentData;

        if (!appointmentData.recurrenceRule) {
            dispatch(saveNewCurrentLesson(appointmentData));
        } else {
            dispatch(saveNewCurrentLessonsArray(appointmentData));
        }
    };

    const addTimeButtons = () => {
        if ((firstTime && currentView == "week") || currentView == "day") {
            TimeButtonsHandler(setSelectedTimeRange, timeRange);
            firstTime = false;
        }
    };

    //Big trouble with DataSource and Agenda view, couldn't fix completely and properly,
    //DevExtreme team know the problem but their various solutions don't help
    return (
        <Scheduler
            dataSource={currentLessons}
            cellDuration={selectedTimeRange}
            defaultCurrentView="month"
            defaultCurrentDate={currentDate}
            views={["month", "week", "day"]}
            editing={allowActions}
            startDayHour={8}
            endDayHour={22}
            onAppointmentUpdating={checkFormFields}
            onAppointmentAdding={checkFormFields}
            onAppointmentFormOpening={onAppointmentFormOpeningAction}
            appointmentComponent={(e) => Appointment(e, information.teachers, information.audiences)}
            onAppointmentAdded={saveCurrentLesson}
            onCurrentViewChange={(view) => setCurrentView(view)}
            onContentReady={addTimeButtons}
        >
            <Resource
                dataSource={information.teachers}
                allowMultiple={true}
                fieldExpr="teacherId"
                label="Преподаватель"
                useColorAsDefault={true}
            ></Resource>
            <Resource dataSource={information.audiences} fieldExpr="classRoomId" label="Аудитория"></Resource>
            <Resource dataSource={information.groups} fieldExpr="groupId" label="Группа"></Resource>
        </Scheduler>
    );
};

export default SchedulerComponent;
