import axios from "axios";
import { News } from "../../../../types";
import { changeNewsIsError, changeNewsIsLoading, setNewsData, setPageNews, setRangeNews } from "./newsReducer";

const endpoint = process.env.REACT_APP_SERVICE_URI;

export const GetNews = (page: number, limit: number) => {

    return async (dispatch) => {
        try {
            dispatch(changeNewsIsLoading(true));

            axios.get(`${endpoint}/news/getnews`, {
                params: { limit: limit, page: page },
            })
            .then((response) => {
                dispatch(setNewsData(response.data));
                dispatch(setRangeNews(Number.parseInt(response.headers['range'])));
                dispatch(changeNewsIsLoading(false));
            });
        } catch(e) {
            dispatch(changeNewsIsError(true));
        }
    }
}

export const AddNews = (newNews: News, pageLimit: number) => {

    return async (dispatch) => {
        try {
            dispatch(changeNewsIsLoading(true));
            axios.post(`${endpoint}/news/postnews`, {
                data: newNews
            })
            .then(res => {
                dispatch(changeNewsIsLoading(false));
                dispatch(GetNews(1, pageLimit));
                dispatch(setPageNews(1));
            })

        } catch(e) {
            dispatch(changeNewsIsError(true));
        }
    }
}