import { createSlice } from "@reduxjs/toolkit";
import { Column, Task } from "../../types/types";

type initialStateType = {
  columns: Column[];
};

const initialState: initialStateType = {
  columns: [
    {
      id: "1",
      title: "To Do",
      tasks: [],
      projectName: "hackathon",
      status: "todo",
    },
    {
      id: "2",
      title: "Doing",
      tasks: [],
      projectName: "hackathon",
      status: "doing",
    },
    {
      id: "3",
      title: "Done",
      tasks: [],
      projectName: "hackathon",
      status: "done",
    },
  ],
};
const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    changeColumnName: (state, action) => {
      state.columns[action.payload.id] = action.payload.content;
    },
    addColumn: (state, action) => {
      state.columns.push(action.payload);
      console.log("new column added")
    }
  },
});

export const columnsActions = columnSlice.actions;
const columnsReducer = columnSlice.reducer;
export default columnsReducer;
