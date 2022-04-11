import React from 'react';
import Query from 'devextreme/data/query';
import localization from 'devextreme/localization';
import moment from 'moment';

moment.locale();

export default function Appointment(model, teachers, audiences) {
    if(teachers.length !== 0 && audiences.length !== 0) {
        
        const { targetedAppointmentData } = model.data;
        const currentTeachers = teachers.filter(oneTeacher => targetedAppointmentData.teacherId.includes(oneTeacher.id));
        const currentAudience = audiences.find(oneAudience => targetedAppointmentData.classRoomId.includes(oneAudience.id));

        return (
            <div className="showtime-preview" style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{backgroundColor: '#337ab7', borderRadius: 30, height: '100%', width: '40px', marginRight: 20}}>

                </div>
                <div>
                    <div style={{fontSize: 16}}> 
                        <strong> {targetedAppointmentData.text} </strong> 
                    </div> 
                    <div> 
                        Аудитория: {currentAudience.text}
                    </div>
                </div>

                <div>
                    <div style={{fontSize: 16, marginLeft: 50}}>
                        {moment(targetedAppointmentData.startDate).format('LT') + ' : ' + moment(targetedAppointmentData.endDate).format('LT')}
                    </div>
                    <div style={{marginLeft: 50}}>
                        {currentTeachers.map(oneTeacher => oneTeacher.text)}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
}
