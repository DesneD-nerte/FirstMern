export type User = {
    _id: String,
    username: String,
    name: String,
    roles: Array<String>,
    email: String,
	imageUri?: String,
    faculties?:Array<String>,
    departments?:Array<String>,
    groups?:Array<String>
}

export type News = {
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


type Audience = {
    id?: String;
    text: String;
}

type Teacher = {
    id?: String;
    text: String;
    email: String;
}

type Lesson = {
    id?: String;
    text: String;
}

type Group = {
    id?: String;
    text: String;
}

export type InformationScheduler = {
    teachers: Array<Teacher>;
    audiences: Array<Audience>;
    lessonsName: Array<Lesson>;
    groups: Array<Group>;
}