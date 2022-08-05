import axios from "axios";
import { changeIsError, changeIsLoading, changeProfileData } from "./profileDataReducer";

const endpoint = process.env.REACT_APP_SERVICE_URI;

export const updateAndGetProfileData = (myData, event) => {
    return async (dispatch) => {
        try {
            dispatch(changeIsLoading(true));
            const data = new FormData();
            data.append("file", event.target.files[0]);
            data.append("id", myData._id);

            await axios.post(`${endpoint}/upload`, data);
            const myUpdatedData = (await axios.get(`${endpoint}/myprofile`)).data;
            dispatch(changeProfileData(myUpdatedData));
            
            window.location.reload();//Необходимо для обновления аватара, иначе пока не получается обновить
        } catch(e) {
            dispatch(changeIsError(true));
        }
    }
}