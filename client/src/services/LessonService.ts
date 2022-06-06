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
    recurrenceRule?: string
}

class LessonService {
    async addArrayLessons(appointmentData) {
        const {recurrenceRule, startDate, endDate} = appointmentData;

        const yearStart = startDate.getFullYear();
        const monthStart = startDate.getMonth();
        const dateStart = startDate.getDate();
        const hoursStart = startDate.getHours();
        const minutesStart = startDate.getMinutes();
        const secondsStart = startDate.getSeconds();

        // const yearEnd = endDate.getFullYear();
        // const monthEnd = endDate.getMonth();
        // const dateEnd = endDate.getDate();
        // const hoursEnd = endDate.getHours();
        // const minutesEnd = endDate.getMinutes();
        // const secondsEnd = endDate.getSeconds();
        // console.log(dateEnd);


        // let arrayRule: Array<string> = recurrenceRule.split(';');
        // console.log(arrayRule);

        // arrayRule = arrayRule.map(oneItem => {
        //     if(oneItem.includes("UNTIL")) {
        //         return oneItem = rule2.toString().slice(6);
        //     }
            
        //     return oneItem;
        // })

        // console.log(arrayRule);

        // const newRecurrenceRule = arrayRule.join(";");

        console.log('recurrenceRule', recurrenceRule);
        // console.log('newRecurrenceRule', newRecurrenceRule);
        
        const rule = rrulestr(recurrenceRule);
        // const rule2 = new RRule({
        //     ...rule.options,
        //     dtstart: new Date(Date.UTC(yearStart, monthStart, dateStart, hoursStart, minutesStart, secondsStart)),
        //     tzid: "America/New_York"
        //     // until: new Date(Date.UTC(yearEnd, monthEnd, dateEnd, hoursEnd, minutesEnd, secondsEnd))
        // })
        rule.options.dtstart = new Date(Date.UTC(yearStart, monthStart, dateStart, hoursStart, minutesStart));
        const occurences = rule.all();

        //const firstCurrentLesson: currentLesson = appointmentData;
        const arrayCurrentLessons: Array<currentLesson> = [];
        
        console.log('ruleText', rule.toText());
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