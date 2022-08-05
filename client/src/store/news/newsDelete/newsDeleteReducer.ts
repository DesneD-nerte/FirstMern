import { News } from "../../../../types";

interface NewsState {
    deleteMode: boolean,
	newsDelete: News[],
}

const initialState: NewsState = {
    deleteMode: false,
	newsDelete: []
}

const CHANGE_DELETE_MODE = 'CHANGE_DELETE_MODE';

const ADD_NEWS_DELETE_DATA = 'ADD_NEWS_DELETE_DATA';
const REMOVE_NEWS_DELETE_DATA = 'REMOVE_NEWS_DELETE_DATA';
const CLEAR_NEWS_DELETE_DATA = 'CLEAR_NEWS_DELETE_DATA';

export const newsDeleteReducer = (state = initialState, action) => {
	switch(action.type) {
        case CHANGE_DELETE_MODE: 
            return {...state, deleteMode: action.payload}
		case ADD_NEWS_DELETE_DATA:
			return {...state, newsDelete: [...state.newsDelete, action.payload]}
        case REMOVE_NEWS_DELETE_DATA:
            return {...state, newsDelete: state.newsDelete.filter((oneNews) => oneNews._id != action.payload._id)}
        case CLEAR_NEWS_DELETE_DATA: 
            return {...state, newsDelete: []}

		default: 
			return state;
	}
}

export const changeDeleteMode = (payload: boolean) => ({type: CHANGE_DELETE_MODE, payload: payload});

export const addNewsDeleteData = (payload: News) => ({type: ADD_NEWS_DELETE_DATA, payload: payload});
export const removeNewsDeleteData = (payload: News) => ({type: REMOVE_NEWS_DELETE_DATA, payload: payload});
export const clearNewsDeleteData = (payload: News) => ({type: CLEAR_NEWS_DELETE_DATA, payload: payload});
