import $api from "../http";
import axios from "axios";
import { 
    AudienceLessonScheduler,
    CurrentLessonScheduler,
    GroupLessonScheduler,
    InformationScheduler,
    LessonLessonScheduler,
    TeacherLessonScheduler 
} from "../../types";

const endpoint = process.env.REACT_APP_SERVICE_URI;

class DataService {

    GetMainInformation () : Promise<InformationScheduler> {
        const requestTeachers = $api.get(`${endpoint}/api/users/teachers/`);
        const requestAudiences = $api.get(`${endpoint}/api/audiences/`);
        const requestLessonsNames = $api.get(`${endpoint}/api/lessons/`);
        const requestGroups = $api.get(`${endpoint}/api/groups/`);

        const newInformationScheduler = axios.all([requestTeachers, requestAudiences, requestLessonsNames, requestGroups])
        .then(axios.spread((...response) => {
            const responseTeachers = response[0];
            const responseAudiences = response[1];
            const responseLessonsNames = response[2];
            const responseGroups= response[3];

            let newArrayTeachers: Array<TeacherLessonScheduler> = [];
            for (const oneTeacher of responseTeachers.data) {
                newArrayTeachers.push({id: oneTeacher._id, text: oneTeacher.name, email: oneTeacher.email});
            }

            let newArrayAudiences: Array<AudienceLessonScheduler> = [];
            for (const oneAudience of responseAudiences.data) {
                newArrayAudiences.push({id: oneAudience._id, text: oneAudience.name});
            }

            let newArrayLessonsNames: Array<LessonLessonScheduler> = [];
            for (const oneLessonName of responseLessonsNames.data) {
                newArrayLessonsNames.push({id: oneLessonName._id, text: oneLessonName.name});
            }

            let newArrayGroups: Array<GroupLessonScheduler> = [];
            for (const oneGroup of responseGroups.data) {
                newArrayGroups.push({id: oneGroup._id, text: oneGroup.name});
            }

            const newInformationScheduler: InformationScheduler = {
                teachers: newArrayTeachers,
                audiences: newArrayAudiences, 
                lessonsName: newArrayLessonsNames,
                groups: newArrayGroups
            };
            return newInformationScheduler;

        }))
        .catch(error => {
            console.log(error);

            const emptyInformationScheduler: InformationScheduler = {
                teachers: [],
                audiences: [],
                lessonsName: [],
                groups: [],
            };
            return emptyInformationScheduler;
        })

        return newInformationScheduler;
    }

    GetCurrentLessons () : Promise<CurrentLessonScheduler[]> {
        const newCurrentLessonPromise = $api.get(`${endpoint}/api/currentlessons`)
        .then(response => {
            const responseArrayLessons = response.data;
            const newCurrentLessons : Array<CurrentLessonScheduler> = [];

            for (const oneLesson of responseArrayLessons) {

                const teachersId : Array<string> = [];
                for (const oneTeacher of oneLesson.teachers) {
                    teachersId.push(oneTeacher._id);
                }

                newCurrentLessons.push({
                    _id: oneLesson._id,
                    classRoomId: oneLesson.classroom._id,
                    endDate: new Date(oneLesson.endDate),
                    startDate: new Date(oneLesson.beginDate),
                    teacherId: teachersId,
                    text: oneLesson.name.name,
                    lessonNameId: oneLesson.name._id,
                    groupId: oneLesson.group._id
                })
            }

            return newCurrentLessons;
        })

        return newCurrentLessonPromise;
    }
}

export default new DataService();