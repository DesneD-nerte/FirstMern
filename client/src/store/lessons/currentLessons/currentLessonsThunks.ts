import axios from "axios";
import { CurrentLesson, CurrentLessonScheduler } from "../../../../types";
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

export const saveNewCurrentLesson = (appointmentData: CurrentLessonScheduler) => {
    return async function loadCurrentLessonsThunk (dispatch) {
        const newCurrentLesson: CurrentLesson = await (
            await axios.post(
                `${endpoint}/currentlessons/savenewcurrentlesson`,
                appointmentData
            )
        ).data;
        const schedulerLesson = await DataService.TransformCurrentLessonsDbToScheduler(newCurrentLesson);
        dispatch(addCurrentLessons(schedulerLesson))

        await axios.post(`${endpoint}/marks/savenewcurrentlesson`, newCurrentLesson);
    }
}

export const saveNewCurrentLessonsArray = (appointmentData: CurrentLessonScheduler) => {
    return async function loadCurrentLessonsThunk (dispatch) {
        const lessonServiceInstance = new LessonService(appointmentData);
        const newCurrentLessonsArray = await lessonServiceInstance.addArrayLessons();

        const schedulerArray = await DataService.TransformCurrentLessonsDbToScheduler(newCurrentLessonsArray);
        dispatch(addCurrentLessons(schedulerArray));

        await axios.post(`${endpoint}/marks/savenewcurrentlessonsarray`, newCurrentLessonsArray);
    }
}