import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import projectReducer from "./slices/projectSlice";
import columnsReducer from "./slices/columnSlice";

const store = configureStore({
    reducer: {
        projects: projectReducer,
        tasks: taskReducer,
        columns: columnsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
