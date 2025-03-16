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
        addProject: (state, action) => {
            state.projects.push(action.payload);
            console.log("New project added:", action.payload.title);
        }
    }
})

export const projectActions = projectSlice.actions
const projectReducer = projectSlice.reducer
export default projectReducer;