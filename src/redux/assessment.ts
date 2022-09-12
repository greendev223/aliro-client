import { createSlice } from "@reduxjs/toolkit";

interface AssessmentResult {
    program_name: String
    scores: Object
    summary: Object
}

const initialState: AssessmentResult = {
    program_name: "",
    scores: {},
    summary: {},
}

export const assessmentSlice = createSlice({
    name: 'Assessment',
    initialState,
    reducers: {
        setAssessment: (state, action) => state = action.payload
    }
})