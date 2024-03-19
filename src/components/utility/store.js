// import { legacy_createStore as createStore } from 'redux';
// import authReducer from './reducer';

// const store = createStore(authReducer);

// export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice';

// export default configureStore({
//     reducer: {
//         auth: authReducer
//     }
// });

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import { combineReducers } from 'redux';

// ... (optional) Import other reducers if you have them

const persistConfig = {
    key: 'root',
    storage,
    // Whitelist reducers you want to persist (likely 'auth')
    whitelist: ['auth']
};

const rootReducer = combineReducers({
    auth: authReducer,
    // ... Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // May be needed for certain data types
        }),
});

export const persistor = persistStore(store);



// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Default storage is localStorage
// import authReducer from './authSlice';

// const persistConfig = {
//     key: 'auth', // Persist the 'auth' slice of the state
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, authReducer);
// export const store = configureStore({
//     reducer: persistedReducer,
// });

// export const persistor = persistStore(store); 