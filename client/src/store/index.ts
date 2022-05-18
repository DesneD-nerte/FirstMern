import { combineReducers, createStore } from "redux";
import { profileDataReducer } from "./profileDataReducer";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { informationReducer } from "./informationReducer";

const rootReducer = combineReducers({
    profileData: profileDataReducer,
    informationData: informationReducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['informationData'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//export const store = createStore(rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>