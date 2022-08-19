import axios from 'axios';
import notify from 'devextreme/ui/notify';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import RoleService from '../services/RoleService';
import { RootState } from '../store';

interface IAllowActions {
    allowUpdating: boolean,
    allowAdding: boolean,
    allowDeleting: boolean,
    allowResizing: boolean,
    allowDragging: boolean,
}

const endpoint = process.env.REACT_APP_SERVICE_URI;

const useScheduler = (props): [IAllowActions, (e) => void, (data) => void]  => {

    const { myData } = useSelector((state: RootState) => state.profileData);

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
                items: props.lessonsName,
                displayExpr: "text",
                valueExpr: "id",
                onValueChanged(args) {
                    if (args.value) {
                        if (props.lessonsName !== undefined) {
                            form.updateData(
                                "text",
                                props.lessonsName.find(
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
    
    return [allowActions, onAppointmentFormOpeningAction, checkFormFields];
}

export default useScheduler