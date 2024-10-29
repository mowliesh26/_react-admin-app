 
import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'  
import { Reducerfunction } from '../Reducer/Reducer'
import { thunk } from 'redux-thunk';

const persistConfig = {
    key: 'mosi',
    storage,
    
}

const persistedReducer = persistReducer(persistConfig, Reducerfunction)
export const store = createStore(persistedReducer,applyMiddleware(thunk))
export const persistor = persistStore(store)
