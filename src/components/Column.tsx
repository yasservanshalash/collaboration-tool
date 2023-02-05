import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useState } from "react";
import { Column as ColumnType, Task as TaskType } from "../types/types";
import Task from "./Task";
import "./Column.css";
import { useDispatch, useSelector } from "react-redux";
import { columnsActions } from "../redux/slices/columnSlice";
import { taskActions} from "../redux/slices/taskSlice"
import { RootState } from "../redux/store";
import {DragDropContext, Droppable} from "react-beautiful-dnd"

const Column = ({
  column,
  tasks,
}: {
  column: ColumnType;
  tasks: TaskType[];
}) => {
  const [addACardClicked, setAddACardClicked] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const columns = useSelector((state: RootState) => state.columns.columns);
  const dispatch = useDispatch();
  const taskTitleHandler = (e) => {
    setTaskTitle(e.target.value)
  }
  const addTaskHandler = () => {
    if(taskTitle === "") {
      return
    }
    dispatch(taskActions.addTask({title: taskTitle, description: "", status: column.status, projectName: column.projectName}))
    setAddACardClicked(!addACardClicked);

  }
  return (
    <Box
      sx={{
        height: "100%",
        width: "300px",
        backgroundColor: "#EBECF0a5",
        mx: 1,
        p: 2,
      }}
    >
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        {column.title}
      </Typography>
      <IconButton>
        <MoreHorizIcon />
      </IconButton>
      </Box>
      {/* <DragDropContext>
        <Droppable> */}
        <Box
        sx={{
          maxHeight: "80vh",
          overflowY: "auto",
          overflow: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        {tasks
          .filter((task: TaskType) => task.status === column.status)
          .map((task: TaskType) => (
            <Task key={crypto.randomUUID()} task={task} />
          ))}
          </Box>
        {/* </Droppable>
      </DragDropContext> */}
            
        <Box sx={{ my: 1.5, display: addACardClicked ? "block" : "none" }}>
          <textarea placeholder="Enter new task..." className="enterTaskArea" onChange={taskTitleHandler}/>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              my: 1,
            }}
          >
            <Button
              sx={{
                backgroundColor: "#0179BF",
                color: "white",
                ml: 0.1,
                fontSize: "70%",
                "&:hover": { backgroundColor: "#0065a0" },
              }}
              onClick={addTaskHandler}
            >
              Add Card
            </Button>
            <IconButton onClick={() => setAddACardClicked(!addACardClicked)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>

        <Button
          sx={{
            width: "100%",
            display: addACardClicked ? "none" : "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: "85%",
            pl: 2,
            color: "#41526E",
          }}
          onClick={() => setAddACardClicked(!addACardClicked)}
        >
          <AddIcon sx={{ fontSize: "99%" }} /> Add a card
        </Button>
        </Box>

      </Box>
  );
};

export default Column;
