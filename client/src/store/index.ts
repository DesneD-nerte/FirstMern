import { applyMiddleware, combineReducers, createStore } from "redux";
import { profileDataReducer } from "./profile/profileDataReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { informationReducer } from "./lessons/information/informationReducer";
import { currentLessonsReducers } from "./lessons/currentLessons/currentLessonsReducer";
import thunkMiddleware from "redux-thunk";
import { newsReducer } from "./news/newsData/newsReducer";
import { newsDeleteReducer } from "./news/newsDelete/newsDeleteReducer";
import { journalReducer } from "./journal/journalReducer";

const rootReducer = combineReducers({
    profileData: profileDataReducer,
    informationData: informationReducer,
    currentLessonsData: currentLessonsReducers,
    journalData: journalReducer,
    newsData: newsReducer,
    newsDeleteData: newsDeleteReducer,
});

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["informationData", "currentLessonsData", "journalData", "newsData", "newsDeleteData"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
//export const store = createStore(rootReducer);

export const store = createStore(persistedReducer, middlewareEnhancer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
