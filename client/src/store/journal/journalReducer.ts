import { JournalInformationType } from "../../../types";

const CHANGE_MARKS_DATA = "CHANGE_MARKS_DATA";

const initialState: JournalInformationType = {
    groups: [],
    lessons: [],
    currentLessons: [],
    marks: [],
};

export const journalReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_MARKS_DATA:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};

export const changeMarksData = (payload: JournalInformationType) => ({ type: CHANGE_MARKS_DATA, payload: payload });
