import { Box, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Column from "../components/Column";
import { RootState } from "../redux/store";
import {Column as Columntype, Task } from "../types/types";
import AddIcon from "@mui/icons-material/Add";
import CloseButton from "@mui/icons-material/Close";
import "./ProjectDashboard.css";
import { columnsActions } from "../redux/slices/columnSlice";
const ProjectDashboard = () => {
  const projectName = useParams().name;
  console.log(projectName);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  console.log(tasks);
  const projects = useSelector((state: RootState) => state.projects.projects);
  console.log(projects);
  const columns = useSelector((state: RootState) => state.columns.columns);
  console.log(columns);
  const [addColumnClicked, setAddColumnClicked] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const dispatch = useDispatch();
  const addColumn = () => {
    dispatch(columnsActions.addColumn({id: crypto.randomUUID(), title: columnTitle, projectName: projectName, tasks: [], status: columnTitle}))
    setAddColumnClicked(!addColumnClicked);
    setColumnTitle("")
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        mt: 14,
        mx: 3,
        overflowY: "scroll",
        overflowX: "scroll",
      }}
    >
      {columns
        ?.filter((column) => column.projectName === projectName)
        .map((column: Columntype) => (
          <Column key={crypto.randomUUID()} column={column} tasks={tasks} />
        ))}

      <Box>
        <Box
          sx={{
            width: "300px",
            backgroundColor: "#EBECF0A5",
            mx: 1,
            p: 2,
          }}
        >
          <Box
            sx={{ display: addColumnClicked ? "none" : "block" }}
            onClick={() => setAddColumnClicked(true)}
          >
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "85%",
                pl: 2,
                color: "#41526E",
              }}
            >
              <AddIcon sx={{ fontSize: "99%" }} /> Add a column
            </Button>
          </Box>
          <Box sx={{ display: addColumnClicked ? "block" : "none" }}>
            <input
              type={"text"}
              className="newColumn"
              style={{ width: "270px" }}
              placeholder="Enter column name..."
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
            />
            <Box sx={{ mt: 1.5 }}>
              <Button
                sx={{
                  backgroundColor: "#0179BF",
                  color: "white",
                  ml: 0.1,
                  fontSize: "70%",
                  "&:hover": { backgroundColor: "#0065a0" },
                }}
                onClick={addColumn}
              >
                Add Column
              </Button>
              <IconButton onClick={() => setAddColumnClicked(false)}>
                <CloseButton />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDashboard;
