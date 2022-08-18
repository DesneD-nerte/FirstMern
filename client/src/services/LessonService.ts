import RRule, { rrulestr } from 'rrule'
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
    recurrenceRule: string
}

class LessonService {

    appointmentData: currentLesson;

    constructor(appointmentData: currentLesson) {
        this.appointmentData = appointmentData; 
    }

    async addArrayLessons() {
        const {recurrenceRule, startDate} = this.appointmentData;

        const occurences = this.#getOccurencies(recurrenceRule, startDate);

        const arrayCurrentLessons: Array<currentLesson> = [];

        occurences.forEach(oneDate => {
            const newCurrentLesson = this.#getNewCurrentLessons(oneDate);

            arrayCurrentLessons.push(newCurrentLesson);
        });

        console.log(arrayCurrentLessons);

        return await (await axios.post(`${endpoint}/currentlessons/savenewcurrentlessonsarray`, arrayCurrentLessons)).data;
    }

    #getOccurencies(recurrenceRule: string, startDate: Date) {
        const yearStart = startDate.getFullYear();
        const monthStart = startDate.getMonth();
        const dateStart = startDate.getDate();
        const hoursStart = startDate.getHours();
        const minutesStart = startDate.getMinutes();
        
        const rule = rrulestr(recurrenceRule);

        rule.options.dtstart = new Date(Date.UTC(yearStart, monthStart, dateStart, hoursStart, minutesStart));
        const occurences = rule.all();

        return occurences;
    }

    #getNewCurrentLessons(oneDateFromRule: Date) {
        const {startDate, endDate} = this.appointmentData;
        
        const year = oneDateFromRule.getFullYear();
        const month = oneDateFromRule.getMonth();
        const date = oneDateFromRule.getDate();

        const startHours = startDate.getHours();
        const startMinutes = startDate.getMinutes();
        const endHours = endDate.getHours();
        const endMinutes = endDate.getMinutes();
        
        const newCurrentLesson: currentLesson = {...this.appointmentData,
            startDate: new Date(year, month, date, startHours, startMinutes),
            endDate: new Date(year, month, date, endHours, endMinutes)
        };

        return newCurrentLesson;
    }
}

export default LessonService;