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
    },
    reorderColumns: (state, action) => {
      const { activeId, overId, projectName } = action.payload;
      
      // Find the position of active and over columns
      const projectColumns = state.columns.filter(col => col.projectName === projectName);
      const allColumns = [...state.columns];
      
      // Find indices in the filtered array
      const activeColumnIndex = projectColumns.findIndex(col => col.id === activeId);
      const overColumnIndex = projectColumns.findIndex(col => col.id === overId);
      
      if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
        // Find the absolute indices in the full columns array
        const activeAbsoluteIndex = allColumns.findIndex(col => col.id === activeId);
        const overAbsoluteIndex = allColumns.findIndex(col => col.id === overId);
        
        // Remove the active column
        const [removedColumn] = allColumns.splice(activeAbsoluteIndex, 1);
        
        // Insert at the new position
        allColumns.splice(overAbsoluteIndex, 0, removedColumn);
        
        // Update the state
        state.columns = allColumns;
      }
    }
  },
});

export const columnsActions = columnSlice.actions;
const columnsReducer = columnSlice.reducer;
export default columnsReducer;
