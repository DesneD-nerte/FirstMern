export type User = {
    _id: String,
    username: String,
    name: String,
    roles: Array<String>,
    email: String,
	imageUri?: String
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