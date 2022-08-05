import { CurrentLessonScheduler } from "../../../../types";

const ADD_CURRENTLESSONS_DATA = 'ADD_CURRENTLESSONS_DATA';
const DELETE_CURRENTLESSONS_DATA = 'ADD_CURRENTLESSONS_DATA';

const endpoint = process.env.REACT_APP_SERVICE_URI;

const initialState: Array<CurrentLessonScheduler> = []

//DevExtreme Scheduler seems to work with Redux, cuz while adding lessons, it change state somehow
export const currentLessonsReducers = (state = initialState, action) => {
    switch(action.type) {
        case (ADD_CURRENTLESSONS_DATA): 
            if(Array.isArray(action.payload)) {
                for (const lesson of action.payload) {
                    if(state.some(oneStateLesson => JSON.stringify(oneStateLesson) === JSON.stringify(lesson))) {
                        return state.filter(obj => !obj['recurrenceRule']);
                    }
                }

                return state.filter(obj => !obj['recurrenceRule']).concat(action.payload); //state copy
            } else {
                return state.concat(action.payload).slice(0, -1);
            }
            
        default: 
            return state;
    }
}

export const addCurrentLessons = (payload) => ({type: ADD_CURRENTLESSONS_DATA, payload: payload});