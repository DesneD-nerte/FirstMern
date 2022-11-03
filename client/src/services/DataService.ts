import axios, { AxiosResponse } from "axios";
import {
    AudienceLessonScheduler,
    CurrentLesson,
    CurrentLessonScheduler,
    GroupLessonScheduler,
    InformationScheduler,
    JournalInformationType,
    LessonLessonScheduler,
    TeacherLessonScheduler,
} from "../../types";

const endpoint = process.env.REACT_APP_SERVICE_URI;

class DataService {
    GetMainInformation(): Promise<InformationScheduler> {
        const requestTeachers = axios.get(`${endpoint}/users/teachers/`);
        const requestAudiences = axios.get(`${endpoint}/api/audiences/`);
        const requestLessonsNames = axios.get(`${endpoint}/api/lessons/`);
        const requestGroups = axios.get(`${endpoint}/api/groups/`);

        const newInformationScheduler = axios
            .all([requestTeachers, requestAudiences, requestLessonsNames, requestGroups])
            .then(
                axios.spread((...response) => {
                    const responseTeachers = response[0];
                    const responseAudiences = response[1];
                    const responseLessonsNames = response[2];
                    const responseGroups = response[3];

                    let newArrayTeachers: Array<TeacherLessonScheduler> = [];
                    for (const oneTeacher of responseTeachers.data) {
                        newArrayTeachers.push({ id: oneTeacher._id, text: oneTeacher.name, email: oneTeacher.email });
                    }

                    let newArrayAudiences: Array<AudienceLessonScheduler> = [];
                    for (const oneAudience of responseAudiences.data) {
                        newArrayAudiences.push({ id: oneAudience._id, text: oneAudience.name });
                    }

                    let newArrayLessonsNames: Array<LessonLessonScheduler> = [];
                    for (const oneLessonName of responseLessonsNames.data) {
                        newArrayLessonsNames.push({ id: oneLessonName._id, text: oneLessonName.name });
                    }

                    let newArrayGroups: Array<GroupLessonScheduler> = [];
                    for (const oneGroup of responseGroups.data) {
                        newArrayGroups.push({ id: oneGroup._id, text: oneGroup.name });
                    }

                    const newInformationScheduler: InformationScheduler = {
                        teachers: newArrayTeachers,
                        audiences: newArrayAudiences,
                        lessonsName: newArrayLessonsNames,
                        groups: newArrayGroups,
                    };
                    return newInformationScheduler;
                })
            )
            .catch((error) => {
                console.log(error);

                const emptyInformationScheduler: InformationScheduler = {
                    teachers: [],
                    audiences: [],
                    lessonsName: [],
                    groups: [],
                };
                return emptyInformationScheduler;
            });

        return newInformationScheduler;
    }

    GetCurrentLessons(): Promise<CurrentLessonScheduler[]> {
        const newCurrentLessonPromise = axios.get(`${endpoint}/currentlessons`).then((response) => {
            const responseArrayLessons: Array<CurrentLesson> = response.data;

            const arrayScheduler = this.fillArrayScheduler(responseArrayLessons);

            return arrayScheduler;
        });

        return newCurrentLessonPromise;
    }

    GetJournalInformation(): Promise<JournalInformationType> {
        const requestGroups = axios.get(`${endpoint}/api/groups`);
        const requestLessons = axios.get(`${endpoint}/api/lessons`);
        const requestCurrentLessons = axios.get(`${endpoint}/currentlessons`);
        const requestMarks = axios.get(`${endpoint}/marks`);

        const newJournalInformation = axios
            .all([requestGroups, requestLessons, requestCurrentLessons, requestMarks])
            .then(
                axios.spread((...response) => {
                    const responseGroups = response[0].data;
                    const responseLessons = response[1].data;
                    const responseCurrentLessons = response[2].data;
                    const responseMarks = response[3].data;

                    return {
                        groups: responseGroups,
                        lessons: responseLessons,
                        currentLessons: responseCurrentLessons,
                        marks: responseMarks,
                    };
                })
            )
            .catch((error) => {
                console.log(error);

                const emptyJournalInformation: JournalInformationType = {
                    groups: [],
                    lessons: [],
                    currentLessons: [],
                    marks: [],
                };
                return emptyJournalInformation;
            });

        return newJournalInformation;
    }

    async TransformCurrentLessonsDbToScheduler(currentLessonsDb: CurrentLesson | Array<CurrentLesson>) {
        if (Array.isArray(currentLessonsDb)) {
            return this.fillArrayScheduler(currentLessonsDb);
        } else {
            return this.changeObjectKeyNames(currentLessonsDb);
        }
    }

    private fillArrayScheduler(responseArrayLessons: Array<CurrentLesson>) {
        const newCurrentLessons: Array<CurrentLessonScheduler> = [];

        for (const oneLesson of responseArrayLessons) {
            newCurrentLessons.push(this.changeObjectKeyNames(oneLesson));
        }

        return newCurrentLessons;
    }

    private changeObjectKeyNames(oneLessonDb: CurrentLesson): CurrentLessonScheduler {
        const teachersId: Array<string> = [];

        for (const oneTeacher of oneLessonDb.teachers) {
            teachersId.push(oneTeacher._id as string);
        }

        return {
            _id: oneLessonDb._id,
            classRoomId: oneLessonDb.classroom._id,
            endDate: new Date(oneLessonDb.endDate),
            startDate: new Date(oneLessonDb.beginDate),
            teacherId: teachersId,
            text: oneLessonDb.name.name,
            lessonNameId: oneLessonDb.name._id,
            groupId: oneLessonDb.group._id,
        };
    }
}

export default new DataService();
