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
      // Generate a unique ID for the new task
      const newTask = {
        ...action.payload,
        id: Date.now().toString() // Use timestamp as a simple unique ID
      };
      state.tasks.push(newTask);
      console.log("new task added")
    },
    moveTask: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const taskIndex = state.tasks.findIndex(task => 
        task.id?.toString() === taskId.toString() || task.title === taskId);
      
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = newStatus;
        console.log(`Task ${taskId} moved to ${newStatus}`);
      }
    },
    reorderTasks: (state, action) => {
      const { activeTaskId, overTaskId, columnStatus } = action.payload;
      
      // Find indices of the tasks within the column
      const columnTasks = state.tasks.filter(task => task.status === columnStatus);
      const allTasks = [...state.tasks];
      
      const activeTaskIndex = columnTasks.findIndex(task => 
        task.id?.toString() === activeTaskId.toString() || task.title === activeTaskId);
        
      const overTaskIndex = columnTasks.findIndex(task => 
        task.id?.toString() === overTaskId.toString() || task.title === overTaskId);
      
      if (activeTaskIndex !== -1 && overTaskIndex !== -1) {
        // Find the absolute indices in the full tasks array
        const activeAbsoluteIndex = allTasks.findIndex(task => 
          task.id?.toString() === activeTaskId.toString() || task.title === activeTaskId);
          
        const overAbsoluteIndex = allTasks.findIndex(task => 
          task.id?.toString() === overTaskId.toString() || task.title === overTaskId);
        
        // Remove the active task
        const [removed] = allTasks.splice(activeAbsoluteIndex, 1);
        
        // Insert at the new position
        allTasks.splice(overAbsoluteIndex, 0, removed);
        
        // Update the state
        state.tasks = allTasks;
        
        console.log(`Reordered task ${activeTaskId} to position of ${overTaskId} in column ${columnStatus}`);
      }
    }
  },
});

export const taskActions = taskSlice.actions;
const taskReducer = taskSlice.reducer;
export default taskReducer;
