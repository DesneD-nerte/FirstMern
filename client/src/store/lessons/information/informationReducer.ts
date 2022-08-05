import { InformationScheduler } from "../../../../types";

const initialState: InformationScheduler = {
    teachers: [{
        id: '1',
        text: 'null Teacher',
        email: 'null Email'
    }],
    lessonsName: [{
        id: '1',
        text: 'null Lesson',
    }],
    audiences: [{
        id: '1',
        text: 'null Audience'
    }],
    groups: [{
        id: '1',
        text: 'null group'
    }]
}

const CHANGE_INFORMATION_DATA = 'CHANGE_INFORMATION_DATA';

export const informationReducer = (state = initialState, action) => {
	switch(action.type) {
		case CHANGE_INFORMATION_DATA:
			return {...state, ...action.payload}

		default: 
			return state;
	}
}

export const changeInformationData = (payload) => ({type: CHANGE_INFORMATION_DATA, payload: payload});
