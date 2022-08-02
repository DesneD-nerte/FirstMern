export type MyData = {
    _id?: string,
    username: string,
    // password: string,
    name: string,
    roles: Array<Role>,
    email: string,
	imageUri?: string,
    faculties?:Array<Faculty>,
    departments?:Array<Department>,
    groups?:Array<Group>
}

export type User = {
    _id?: string,
    username: string,
    password: string,
    name: string,
    roles: Array<string>,
    email: string,
	imageUri?: string,
    faculties?:Array<string>,
    departments?:Array<string>,
    groups?:Array<string>
}

export type News = {
    _id?: string,
	name: string,
	content: string,
	createdAt: Date
}

export type Message = {
    _id?: string;
    content: string;
    createdAt: Date;/////Number
    user?: User;
}


export type AudienceLessonScheduler = {
    id?: string;
    text: string;
}

export type TeacherLessonScheduler = {
    id?: string;
    text: string;
    email: string;
}

export type LessonLessonScheduler = {
    id?: string;
    text: string;
}
export type GroupLessonScheduler = {
    id?: string;
    text: string;
}

export type InformationScheduler = {
    teachers: Array<TeacherLessonScheduler>;
    audiences: Array<AudienceLessonScheduler>;
    lessonsName: Array<LessonLessonScheduler>;
    groups: Array<GroupLessonScheduler>;
}

export type CurrentLessonScheduler = {
    _id: string,
    classRoomId: string,
    endDate: Date,
    startDate: Date,
    teacherId: Array<string>,
    text: string,
    lessonNameId: string,
    groupId: string
}


export type Audience = {
    _id: string;
    name: string;
}

export type Lesson = {
    _id: string;
    name: string;
}
export type Group = {
    _id: string;
    name: string;
}
export type Department = {
    _id: string;
    name: string;
}
export type Faculty = {
    _id: string;
    name: String;
}
export type Role = {
    _id: string;
    value: string
}

export type CurrentLesson = {
    _id: string,
    name: Lesson,
    teachers: Array<User>,
    beginDate: Date,
    endDate: Date,
    classroom: Audience,
    group: Group
}



type UserMarks = {
    _id?: string,
    username: string,
    password: string,
    name: string,
    roles: Array<Role>,
    email: string,
	imageUri?: string,
    faculties?:Array<Faculty>,
    departments?:Array<Department>,
    groups?:Array<Group>
}

export interface Marks extends Record<string, any> {
    _id: string,
    user: UserMarks,
    lesson: Lesson,
    allCurrentLessons: [
        {
            _id: string,
            currentLesson: CurrentLesson,
            mark: string
        }
    ]
}