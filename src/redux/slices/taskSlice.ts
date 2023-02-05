import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/types";

type initialStateType = {
  tasks: Task[];
};
const initialState: initialStateType = {
  tasks: [
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      console.log("new task added")
    }
  },
});

export const taskActions = taskSlice.actions;
const taskReducer = taskSlice.reducer;
export default taskReducer;
