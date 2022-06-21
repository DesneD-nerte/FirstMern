import axios from "axios";
import { CurrentLessonScheduler } from "../../types";
import DataService from "../services/DataService";
import LessonService from "../services/LessonService";
import { changeInformationData } from "./informationReducer";

const ADD_CURRENTLESSONS_DATA = 'ADD_CURRENTLESSONS_DATA';
const DELETE_CURRENTLESSONS_DATA = 'ADD_CURRENTLESSONS_DATA';

const endpoint = process.env.REACT_APP_SERVICE_URI;

const initialState: Array<CurrentLessonScheduler> = []

//DevExtreme Scheduler seems to work with Redux, cuz while adding lessons, it change state somehow
export const currentLessonsReducers = (state = initialState, action) => {
    switch(action.type) {
        case (ADD_CURRENTLESSONS_DATA): 
            console.log(state);
            if(Array.isArray(action.payload)) {
                for (const lesson of action.payload) {
                    if(state.some(oneStateLesson => JSON.stringify(oneStateLesson) === JSON.stringify(lesson))) {
                        return state.filter(obj => !obj['recurrenceRule']);
                    }
                }

                return state.filter(obj => !obj['recurrenceRule']).concat(action.payload); //state copy
            } else {
                console.log(action.payload);
                return state.concat(action.payload).slice(0, -1);
            }
            
        default: 
            return state;
            // return state.filter(obj => !obj['recurrenceRule']);
    }
}

export const addCurrentLessons = (payload) => ({type: ADD_CURRENTLESSONS_DATA, payload: payload});

export const loadCurrentLessons = () => {
    return function loadCurrentLessonsThunk (dispatch) {
        DataService.GetMainInformation().then((newInformation) => {
            dispatch(changeInformationData(newInformation));
        });

        DataService.GetCurrentLessons().then((newCurrentLessons) => {
            console.log(newCurrentLessons);
            dispatch(addCurrentLessons(newCurrentLessons));
        });
    }
}

export const saveNewCurrentLesson = (appointmentData) => {
    return async function loadCurrentLessonsThunk (dispatch) {
        const newCurrentLesson = await (
            await axios.post(
                `${endpoint}/currentlessons/savenewcurrentlesson`,
                appointmentData
            )
        ).data;

        dispatch(addCurrentLessons(newCurrentLesson))

        await axios.post(`${endpoint}/marks/savenewcurrentlesson`, {
            appointmentData,
            newCurrentLesson,
        });
    }
}

export const saveNewCurrentLessonsArray = (appointmentData) => {
    return async function loadCurrentLessonsThunk (dispatch) {
        const lessonServiceInstance = new LessonService(appointmentData);
        const newCurrentLessonsArray = await lessonServiceInstance.addArrayLessons();
        
        const schedulerArray = await DataService.TransformCurrentLessonsDbToScheduler(newCurrentLessonsArray);
        dispatch(addCurrentLessons(schedulerArray));

        await axios.post(`${endpoint}/marks/savenewcurrentlessonsarray`, {
            appointmentData,
            newCurrentLessonsArray,
        });
    }
}