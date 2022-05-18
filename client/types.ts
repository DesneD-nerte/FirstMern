export type MyData = {
    _id?: String,
    username: String,
    password: String,
    name: String,
    roles: Array<Role>,
    email: String,
	imageUri?: String,
    faculties?:Array<Faculty>,
    departments?:Array<Department>,
    groups?:Array<Group>
}

export type User = {
    _id?: String,
    username: String,
    password: String,
    name: String,
    roles: Array<String>,
    email: String,
	imageUri?: String,
    faculties?:Array<String>,
    departments?:Array<String>,
    groups?:Array<String>
}

export type News = {
    _id?: String,
	name: string,
	content: string,
	createdAt: Date
}

export type Message = {
    _id?: String;
    content: String;
    createdAt: Date;/////Number
    user?: User;
}


export type AudienceLessonScheduler = {
    id?: String;
    text: String;
}

export type TeacherLessonScheduler = {
    id?: String;
    text: String;
    email: String;
}

export type LessonLessonScheduler = {
    id?: String;
    text: String;
}
export type GroupLessonScheduler = {
    id?: String;
    text: String;
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
    _id: String;
    name: String;
}

export type Lesson = {
    _id: String;
    name: String;
}
export type Group = {
    _id: String;
    name: String;
}
export type Department = {
    _id: String;
    name: String;
}
export type Faculty = {
    _id: String;
    name: String;
}
export type Role = {
    _id: String;
    value: String
}

export type CurrentLesson = {
    _id: String,
    name: Lesson,
    teacher: User,
    beginDate: Date,
    endDate: Date,
    classroom: Audience,
    group: Group
}



type UserMarks = {
    _id?: String,
    username: String,
    password: String,
    name: String,
    roles: Array<Role>,
    email: String,
	imageUri?: String,
    faculties?:Array<Faculty>,
    departments?:Array<Department>,
    groups?:Array<Group>
}

// export type Marks = {
//     _id: String,
//     user: UserMarks,
//     lesson: Lesson,
//     allCurrentLessons: [
//         {
//             _id: String,
//             currentLesson: CurrentLesson,
//             mark: String
//         }
//     ]
// }

export interface Marks extends Record<string, any> {
    _id: String,
    user: UserMarks,
    lesson: Lesson,
    allCurrentLessons: [
        {
            _id: String,
            currentLesson: CurrentLesson,
            mark: String
        }
    ]
}