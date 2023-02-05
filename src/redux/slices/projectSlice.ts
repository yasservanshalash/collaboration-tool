import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../types/types";

type initialStateType = {
    projects: Project[]
}
const initialState: initialStateType = {
    projects: [{title: "hackathon"}, {title: "frontend-project"}, {title: "backend-project"}],
}

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {

    }
})

export const projectActions = projectSlice.actions
const projectReducer = projectSlice.reducer
export default projectReducer;