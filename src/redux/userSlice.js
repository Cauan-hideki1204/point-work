import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        isLogged: false,
    },
    reducers: {
        dataUser(state, {payload}) {
            return { ...state, isLogged: true, id: payload }
        },
    }
})

export const { dataUser, logout } = slice.actions;

export const selectUser = (state) => state.user

export default slice.reducer