import { createSlice } from "@reduxjs/toolkit";

export interface VisaPageManagement {
    pageSectionName: 'Agreement' | 'Documents' | ''
}

const initialState : VisaPageManagement = {
    pageSectionName: ''
}

export const visaPageManageSlice = createSlice({
    name: 'visaPageManage',
    initialState,
    reducers: {
        changePage: (state, action) => {
            console.log('dsfgasdg', state.pageSectionName,  action.payload)
            state.pageSectionName = action.payload
        }
    }
})