import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../components/login/loginSlice';
import userSlice from '../components/login/userSlice';

export const store = configureStore({
    reducer: {
        token:tokenReducer,
        user:userSlice
    }
})


