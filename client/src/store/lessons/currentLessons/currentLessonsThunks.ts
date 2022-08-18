import axios from "axios";
import DataService from "../../../services/DataService";
import LessonService from "../../../services/LessonService";
import { changeInformationData } from "../information/informationReducer";
import { addCurrentLessons } from "./currentLessonsReducer";

const endpoint = process.env.REACT_APP_SERVICE_URI;

export const loadCurrentLessons = () => {
    return function loadCurrentLessonsThunk (dispatch) {
        DataService.GetMainInformation().then((newInformation) => {
            dispatch(changeInformationData(newInformation));
        });

        DataService.GetCurrentLessons().then((newCurrentLessons) => {
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

        // await axios.post(`${endpoint}/marks/savenewcurrentlessonsarray`, {
        //     appointmentData,
        //     newCurrentLessonsArray,
        // });
    }
}