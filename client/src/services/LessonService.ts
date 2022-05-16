import { rrulestr } from 'rrule'
import axios from 'axios';

const endpoint = process.env.REACT_APP_SERVICE_URI;

type currentLesson = {
    classRoomId: string,
    endDate: Date,
    startDate: Date,
    teacherId: Array<string>,
    text: string,
    lessonNameId: string,
    groupId: string,
    recurrenceRule?: string
}

class LessonService {
    async addArrayLessons(appointmentData) {
        const {recurrenceRule, startDate, endDate} = appointmentData;

        const year = startDate.getFullYear();
        const month = startDate.getMonth();
        const date = startDate.getDate();
        const hours = startDate.getHours();
        const minutes = startDate.getMinutes();

        const rule = rrulestr(recurrenceRule);
        rule.options.dtstart = new Date(Date.UTC(year, month, date, hours, minutes));
        const occurences = rule.all();

        const arrayCurrentLessons: Array<currentLesson> = [];

        console.log('rule', rule);
        console.log('occurences', occurences);

        occurences.forEach(oneDate => {
            const year = oneDate.getFullYear();
            const month = oneDate.getMonth();
            const date = oneDate.getDate();

            const startHours = startDate.getHours();
            const startMinutes = startDate.getMinutes();
            const endHours = endDate.getHours();
            const endMinutes = endDate.getMinutes();
            
            const newCurrentLesson: currentLesson = {...appointmentData,
                startDate: new Date(year, month, date, startHours, startMinutes),
                endDate: new Date(year, month, date, endHours, endMinutes)
            };

            arrayCurrentLessons.push(newCurrentLesson);
        });

        return await (await axios.post(`${endpoint}/currentlessons/savenewcurrentlessonsarray`, arrayCurrentLessons)).data;
    }
}

export default new LessonService();