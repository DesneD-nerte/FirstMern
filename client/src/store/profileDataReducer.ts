import { User } from "../../types";

const initialState: User = {
    _id: '',
    username: '',
    name: '',
    roles: [],
    email: '',
	imageUri: '',
	faculties: [],
	departments: [],
	groups: [],
}

const CHANGE_PROFILE_DATA = 'CHANGE_PROFILE_DATA';

export const profileDataReducer = (state = initialState, action) => {
	switch(action.type) {
		case CHANGE_PROFILE_DATA:
			return {...state, ...action.payload}

		default: 
			return state;
	}
}

export const changeProfileData = (payload) => ({type: CHANGE_PROFILE_DATA, payload: payload});
