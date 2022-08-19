import RRule, { rrulestr } from 'rrule'
import axios from 'axios';
import { CurrentLessonScheduler } from '../../types';

const endpoint = process.env.REACT_APP_SERVICE_URI;

class LessonService {

    appointmentData: CurrentLessonScheduler;

    constructor(appointmentData: CurrentLessonScheduler) {
        this.appointmentData = appointmentData; 
    }

    async addArrayLessons() {
        const {recurrenceRule, startDate} = this.appointmentData;

        const occurences = this.getOccurencies(recurrenceRule as string, startDate);

        const arrayCurrentLessons: Array<CurrentLessonScheduler> = [];

        occurences.forEach(oneDate => {
            const newCurrentLesson = this.getNewCurrentLessons(oneDate);

            arrayCurrentLessons.push(newCurrentLesson);
        });

        return await (await axios.post(`${endpoint}/currentlessons/savenewcurrentlessonsarray`, arrayCurrentLessons)).data;
    }

    private getOccurencies(recurrenceRule: string, startDate: Date) {
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

    private getNewCurrentLessons(oneDateFromRule: Date) {
        const {startDate, endDate} = this.appointmentData;
        
        const year = oneDateFromRule.getFullYear();
        const month = oneDateFromRule.getMonth();
        const date = oneDateFromRule.getDate();

        const startHours = startDate.getHours();
        const startMinutes = startDate.getMinutes();
        const endHours = endDate.getHours();
        const endMinutes = endDate.getMinutes();
        
        const newCurrentLesson: CurrentLessonScheduler = {...this.appointmentData,
            startDate: new Date(year, month, date, startHours, startMinutes),
            endDate: new Date(year, month, date, endHours, endMinutes)
        };

        return newCurrentLesson;
    }
}

export default LessonService;