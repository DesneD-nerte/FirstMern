import axios from "axios";
import { News } from "../../../../types";
import { GetNews } from "../newsData/newsDataThunks";
import { changeNewsIsError, changeNewsIsLoading, setPageNews } from "../newsData/newsReducer";
import { addNewsDeleteData, changeDeleteMode, removeNewsDeleteData } from "./newsDeleteReducer";

const endpoint = process.env.REACT_APP_SERVICE_URI;

export const DeleteNews = (newsDelete: News[], pageLimit: number) => {

    return async (dispatch) => {
        try {
            dispatch(changeNewsIsLoading(true));
            axios
            .delete(`${endpoint}/news/deletenews`, { data: { arrayIdNews: newsDelete.map(prop => prop._id)} })
            .then((response) => {
                dispatch(GetNews(1, pageLimit));
                dispatch(changeDeleteMode(false));
                dispatch(changeNewsIsLoading(false));
                dispatch(setPageNews(1));
            });
        } catch(e) {
            dispatch(changeNewsIsError(true));
        }
    }
}

export const ToggleNews = (newsDelete: News[], newNews: News) => {

    return async (dispatch) => {
        try {
            if(!newsDelete.some(oneNews => oneNews._id === newNews._id)) {
                dispatch(addNewsDeleteData(newNews));
            } else {
                dispatch(removeNewsDeleteData(newNews));
            }
        } catch(e) {
            
        }
    }
}