import { MyData, User } from "../../types";

interface ProfileState {
	myData: MyData,
	isLoading: boolean,
	isError: boolean
}

// const initialState: MyData = {
//     _id: '',
//     username: '',
// 	password: '',
//     name: '',
//     roles: [],
//     email: '',
// 	imageUri: '',
// 	faculties: [],
// 	departments: [],
// 	groups: [],
// }

const initialState: ProfileState = {
	myData: {
		_id: '',
		username: '',
		// password: '',
		name: '',
		roles: [],
		email: '',
		imageUri: '',
		faculties: [],
		departments: [],
		groups: [],
	},
	isLoading: false,
	isError: false
}

const CHANGE_PROFILE_DATA = 'CHANGE_PROFILE_DATA';
const CHANGE_ISLOADING = 'CHANGE_ISLOADING';
const CHANGE_ISERROR = 'CHANGE_ISERROR';

export const profileDataReducer = (state = initialState, action) => {
	switch(action.type) {
		case CHANGE_PROFILE_DATA:
			return {myData: action.payload, isLoading: false, isError: false}
		case CHANGE_ISLOADING: 
			return {...state, isLoading: action.payload}
		case CHANGE_ISERROR: 
			return {...state, isError: action.payload}
		default: 
			return state;
	}
}

export const changeProfileData = (payload: MyData) => ({type: CHANGE_PROFILE_DATA, payload: payload});
export const changeIsLoading = (payload: boolean) => ({type: CHANGE_ISLOADING, payload: payload});
export const changeIsError = (payload: boolean) => ({type: CHANGE_ISERROR, payload: payload});
