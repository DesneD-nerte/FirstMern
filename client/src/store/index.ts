import { applyMiddleware, combineReducers, createStore } from "redux";
import { profileDataReducer } from "./profileDataReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { informationReducer } from "./informationReducer";
import { currentLessonsReducers } from "./currentLessonsReducer";
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    profileData: profileDataReducer,
    informationData: informationReducer,
    currentLessonsData: currentLessonsReducers
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['informationData', 'currentLessonsData']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareEnhancer = applyMiddleware(thunkMiddleware)
//export const store = createStore(rootReducer);

export const store = createStore(persistedReducer, middlewareEnhancer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>