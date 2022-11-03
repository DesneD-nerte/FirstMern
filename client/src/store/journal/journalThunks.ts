import DataService from "../../services/DataService";
import { changeMarksData } from "./journalReducer";

const endpoint = process.env.REACT_APP_SERVICE_URI;

export const loadJournalInformation = () => {
    return function loadJournalThunk(dispatch) {
        DataService.GetJournalInformation().then((newJournalInformation) => {
            dispatch(changeMarksData(newJournalInformation));
        });
    };
};
