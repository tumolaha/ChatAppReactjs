import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './AuthSlice';
import contactReducer from './contactSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ["contact"],
};
export default configureStore({
    reducer: {
        auth: authReducer,
        contact: contactReducer,
    },
});
const rootReducer = combineReducers({ auth: authReducer, contact: contactReducer, });
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
