import Scheduler, { Resource } from "devextreme-react/scheduler";
import ruMessages from "devextreme/localization/messages/ru.json";
import React, { useEffect, useState } from "react";
import { loadMessages, locale } from "devextreme/localization";
import Appointment from "./Appointment";
import notify from "devextreme/ui/notify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import RoleService from "../../services/RoleService";
import TimeButtonsHandler from "./TimeButtonsHandler";
import {
    saveNewCurrentLesson,
    saveNewCurrentLessonsArray,
} from "../../store/currentLessonsReducer";

const endpoint = process.env.REACT_APP_SERVICE_URI;

const currentDate = new Date();

const SchedulerComponent = ({ information, currentLessons, counter }) => {
    const scheduler = React.useRef(null);

    loadMessages(ruMessages);
    locale(navigator.language);

    const myData = useSelector((state) => ({ ...state.profileData }));
    const dispatch = useDispatch();

    const [allowActions, setAllowActions] = useState({
        allowUpdating: true,
        allowAdding: true,
        allowDeleting: true,
        allowResizing: true,
        allowDragging: true,
    });

    useEffect(() => {
        setAllowActions(RoleService.SchedulerSetActions(myData.roles));
    }, []);

    const onAppointmentFormOpeningAction = (e) => {
        const form = e.form;
        let mainGroupitems = form.itemOption("mainGroup").items;
        form.itemOption("mainGroupitems.allDay", "visible", false);
        mainGroupitems[0] = {
            colSpan: 2,
            label: { text: "Предмет" },
            editorType: "dxSelectBox",
            dataField: "lessonNameId",
            editorOptions: {
                items: information.lessonsName,
                displayExpr: "text",
                valueExpr: "id",
                onValueChanged(args) {
                    if (args.value) {
                        if (information.lessonsName !== undefined) {
                            form.updateData(
                                "text",
                                information.lessonsName.find(
                                    (lessonName) => lessonName.id === args.value
                                ).text
                            );
                        }
                    }
                },
            },
        };
        form.itemOption("mainGroup", "items", mainGroupitems);
    };

    const checkFormFields = (data) => {
        const formData = data.appointmentData || data.newData;
        if (
            formData.teacherId === undefined ||
            formData.classRoomId === undefined ||
            formData.lessonNameId === undefined ||
            formData.groupId === undefined
        ) {
            data.cancel = true;
            notify("Заполните все данные", "warning", 1000);
        }

        axios.put(`${endpoint}/currentlessons/updateCurrentLesson`, formData);
    };

    const views = [
        {
            type: "agenda",
        },
        {
            type: "month",
        },
        {
            type: "week",
        },
        {
            type: "day",
        },
    ];

    const timeRange = [15, 30, 60];
    const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange[1]);
    const [currentView, setCurrentView] = useState("month");
    let firstTime = true;

    const saveCurrentLesson = (e) => {
        const { appointmentData } = e;

        if (!appointmentData.recurrenceRule) {
            dispatch(saveNewCurrentLesson(appointmentData));
        } else {
            dispatch(saveNewCurrentLessonsArray(appointmentData));
        }
    };

    //Big trouble with DataSource and Agenda view, couldn't fix completely and properly,
    //DevExtreme team know the problem but their various solutions don't help
    if (counter.current >= 4) {
        return (
            <Scheduler
                ref={scheduler}
                dataSource={currentLessons}
                cellDuration={selectedTimeRange}
                defaultCurrentView="agenda"
                defaultCurrentDate={currentDate}
                views={views}
                editing={allowActions}
                startDayHour={8}
                endDayHour={22}
                onAppointmentUpdating={checkFormFields}
                onAppointmentAdding={checkFormFields}
                onAppointmentFormOpening={onAppointmentFormOpeningAction}
                appointmentComponent={(e) =>
                    Appointment(e, information.teachers, information.audiences)
                }
                onAppointmentAdded={saveCurrentLesson}
                onCurrentViewChange={(view) => setCurrentView(view)}
                onContentReady={() => {
                    if (
                        firstTime === true &&
                        currentView !== "agenda" &&
                        currentView !== "month" &&
                        currentView !== undefined
                    ) {
                        TimeButtonsHandler(setSelectedTimeRange, timeRange);
                        firstTime = false;
                    }
                }}
            >
                <Resource
                    dataSource={information.teachers}
                    allowMultiple={true}
                    fieldExpr="teacherId"
                    label="Преподаватель"
                    useColorAsDefault={true}
                ></Resource>
                <Resource
                    dataSource={information.audiences}
                    fieldExpr="classRoomId"
                    label="Аудитория"
                ></Resource>
                <Resource
                    dataSource={information.groups}
                    fieldExpr="groupId"
                    label="Группа"
                ></Resource>
            </Scheduler>
        );
    }

    counter.current += 1;

    return <div>Loading...</div>;
};

export default SchedulerComponent;
