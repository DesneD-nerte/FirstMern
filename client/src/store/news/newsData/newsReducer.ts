import { News } from "../../../../types";

interface NewsState {
	news: News[],
	isLoading: boolean,
	isError: boolean,
    limit: number,
    page: number,
	range: number,
    filter: {
        query: string
    }
}

const initialState: NewsState = {
	news: [],
	isLoading: false,
	isError: false,
    limit: 5,
    page: 1,
	range: 0,
    filter: {
        query: ""
    }
}

const SET_NEWS_DATA = 'SET_NEWS_DATA';

const SET_PAGE_NEWS = 'SET_PAGE_NEWS';
const SET_LIMIT_NEWS = 'SET_LIMIT_NEWS';
const SET_RANGE_NEWS = 'SET_RANGE_NEWS';
const SET_FILTER_NEWS = 'SET_FILTER_NEWS';

const CHANGE_NEWS_ISLOADING = 'CHANGE_NEWS_ISLOADING';
const CHANGE_NEWS_ISERROR = 'CHANGE_NEWS_ISERROR';

export const newsReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_NEWS_DATA:
			return {...state, news: action.payload, isLoading: false, isError: false}

		case SET_PAGE_NEWS:
			return {...state, page: action.payload}
		case SET_LIMIT_NEWS:
			return {...state, limit: action.payload}
		case SET_RANGE_NEWS:
			return {...state, range: action.payload}
		case SET_FILTER_NEWS:
			return {...state, filter: {query: action.payload}}

		case CHANGE_NEWS_ISLOADING: 
			return {...state, isLoading: action.payload}
		case CHANGE_NEWS_ISERROR: 
			return {...state, isError: action.payload}
		default: 
			return state;
	}
}

export const setNewsData = (payload: News) => ({type: SET_NEWS_DATA, payload: payload});

export const setPageNews = (payload: number) => ({type: SET_PAGE_NEWS, payload: payload});
export const setLimitNews = (payload: number) => ({type: SET_LIMIT_NEWS, payload: payload});
export const setRangeNews = (payload: number) => ({type: SET_RANGE_NEWS, payload: payload});
export const setFilterNews = (payload: string) => ({type: SET_FILTER_NEWS, payload: payload});

export const changeNewsIsLoading = (payload: boolean) => ({type: CHANGE_NEWS_ISLOADING, payload: payload});
export const changeNewsIsError = (payload: boolean) => ({type: CHANGE_NEWS_ISERROR, payload: payload});
