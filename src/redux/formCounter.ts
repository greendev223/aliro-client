import { createSlice } from "@reduxjs/toolkit";

export interface FormCounter {
    screen: number;
    no_screens: number;
}

const initialState: FormCounter = {
    screen: 1,
    no_screens: 9,
}

export const formCounterSlice = createSlice({
    name: 'formCounter',
    initialState,
    reducers: {
        next: (state) => { state.screen += 1 },
        prev: (state) => { state.screen -= 1 },
        set: (state, action) => { state.screen = action.payload },
    }
})