import { Box, Button, IconButton, Typography, Menu, MenuItem } from "@mui/material";
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
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { useDroppable } from '@dnd-kit/core';

const Column = ({
  column,
  tasks,
}: {
  column: ColumnType;
  tasks: TaskType[];
}) => {
  const [addACardClicked, setAddACardClicked] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const columns = useSelector((state: RootState) => state.columns.columns);
  const dispatch = useDispatch();
  
  // Set up the droppable area for this column
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: column.status,
    data: {
      columnId: column.id,
      status: column.status,
      type: 'column'
    }
  });
  
  const taskTitleHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskTitle(e.target.value)
  }
  
  const addTaskHandler = () => {
    if(taskTitle === "") {
      return
    }
    dispatch(taskActions.addTask({title: taskTitle, description: "", status: column.status, projectName: column.projectName}))
    setAddACardClicked(!addACardClicked);
    setTaskTitle(""); // Clear input after adding
  }
  
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleDeleteColumn = () => {
    console.log("Deleting column with ID:", column.id);
    dispatch(columnsActions.deleteColumn(column.id));
    handleMenuClose();
  };
  
  // Get tasks for this column
  const columnTasks = tasks.filter((task: TaskType) => task.status === column.status);
  
  return (
    <Box
      ref={setDroppableRef}
      sx={{
        height: "auto", // Changed from 100% to auto for dynamic height
        minWidth: "300px",
        maxWidth: "300px",
        backgroundColor: "#EBECF0a5",
        mx: 1,
        p: 2,
        position: "relative",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          {column.title}
        </Typography>
        <IconButton onClick={handleMenuClick}>
          <MoreHorizIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteColumn}>Delete Column</MenuItem>
      </Menu>

      <Box
        sx={{
          maxHeight: columnTasks.length === 0 ? "auto" : (addACardClicked ? "57.6vh" : "70vh"),
          overflowY: columnTasks.length > 0 ? "auto" : "visible",
          overflow: columnTasks.length > 0 ? "scroll" : "visible",
          scrollBehavior: "smooth",
          minHeight: columnTasks.length === 0 ? "10px" : "50px", // Even smaller height for empty columns
          padding: columnTasks.length === 0 ? "0" : "inherit", 
          margin: columnTasks.length === 0 ? "0" : "inherit",
          flexGrow: columnTasks.length > 0 ? 1 : 0, // Allow to grow if has tasks
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, and newer Edge
          },
          msOverflowStyle: "none", // Hide scrollbar for IE and older Edge
          scrollbarWidth: "none", // Hide scrollbar for Firefox
        }}
      >
        {/* SortableContext for tasks within this column */}
        <SortableContext 
          items={columnTasks.map(task => task.id || task.title)} 
          strategy={verticalListSortingStrategy}
        >
          <div>
            {columnTasks.map((task: TaskType) => (
              <SortableItem 
                key={task.id || task.title} 
                id={task.id || task.title}
                data-column-id={column.status}
                data-column-status={column.status}
              >
                <Task task={task} />
              </SortableItem>
            ))}
            {/* Empty state - invisible but maintains droppable area */}
          </div>
        </SortableContext>
      </Box>
        
      <Box sx={{ my: 1.5, display: addACardClicked ? "block" : "none" }}>
        <textarea 
          placeholder="Enter new task..." 
          className="enterTaskArea" 
          onChange={taskTitleHandler}
          value={taskTitle}
        />
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
            marginTop: columnTasks.length === 0 ? "4px" : "12px"
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
