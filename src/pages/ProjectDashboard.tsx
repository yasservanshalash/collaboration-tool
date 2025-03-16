import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Column from "../components/Column";
import SortableColumn from "../components/SortableColumn";
import { RootState } from "../redux/store";
import {Column as Columntype, Task as TaskType } from "../types/types";
import AddIcon from "@mui/icons-material/Add";
import CloseButton from "@mui/icons-material/Close";
import "./ProjectDashboard.css";
import { columnsActions, createDefaultColumns } from "../redux/slices/columnSlice";
import { taskActions } from "../redux/slices/taskSlice";
import TaskComponent from "../components/Task";
import { 
  DndContext, 
  DragEndEvent, 
  DragOverEvent,
  DragStartEvent, 
  closestCenter, 
  useSensors, 
  useSensor, 
  PointerSensor, 
  UniqueIdentifier,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  arrayMove
} from '@dnd-kit/sortable';

interface ProjectDashboardProps {
  columns: Columntype[];
  tasks: TaskType[];
}

// Custom drop animation configuration
const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ columns, tasks }) => {
  // Get route parameter, using "hackathon" as the default project when on the root route
  const { name } = useParams();
  const projectName = name || "hackathon"; // Use "hackathon" as default when on root route
  const dispatch = useDispatch();
  const [addColumnClicked, setAddColumnClicked] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const [activeTask, setActiveTask] = useState<UniqueIdentifier | null>(null);
  const [activeTaskData, setActiveTaskData] = useState<TaskType | null>(null);
  const [activeColumn, setActiveColumn] = useState<Columntype | null>(null);
  const [activeTaskColumn, setActiveTaskColumn] = useState<Columntype | null>(null);
  const columnsAddedRef = useRef(false); // Track if columns have been added
  
  // Get the columns for this project
  const projectColumns = columns.filter(col => col.projectName === projectName);
  
  // Only add default columns if none exist for this project
  useEffect(() => {
    // Check if this project already has columns
    if (projectName && projectColumns.length === 0 && !columnsAddedRef.current) {
      console.log(`Adding default columns for project: ${projectName}`);
      
      // Mark as processed so we don't trigger this effect again
      columnsAddedRef.current = true;
      
      // Add default columns for this project
      dispatch(columnsActions.addDefaultColumns(projectName));
    }
  }, [projectName, projectColumns.length, dispatch]);

  // Configure sensors for better touch/mouse handling
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement before drag starts
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    
    // Check if we're dragging a task or a column
    const isColumn = active.data.current?.type === 'column';
    
    if (isColumn) {
      // We're dragging a column
      const draggedColumn = columns.find(col => col.id === active.id);
      if (draggedColumn) {
        setActiveColumn(draggedColumn);
      }
    } else {
      // We're dragging a task
      setActiveTask(active.id);
      
      // Find the task data for the dragged task
      const task = tasks.find(t => 
        (t.id?.toString() === active.id.toString()) || 
        (t.title === active.id)
      );
      
      if (task) {
        setActiveTaskData(task);
        
        // Find the column this task belongs to
        const taskColumn = columns.find(col => 
          col.status === task.status && col.projectName === projectName
        );
        
        if (taskColumn) {
          setActiveTaskColumn(taskColumn);
        }
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // This event is fired when dragging over a droppable area
    const { active, over } = event;
    
    if (!over) return;
    
    // Check if we're dragging a task
    if (activeTask && !activeColumn) {
      // Check if we're over a column (either directly or any part of it)
      const isOverColumn = columns.some(col => 
        col.status === over.id || // Direct column ID match
        col.id === over.id ||     // Column ID match
        over.data?.current?.status === col.status // Data attribute match
      );
      
      if (isOverColumn) {
        // We're over a column - we can highlight it or do other UI feedback here
        console.log(`Dragging task over column: ${over.id}`);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      // Reset all active states
      setActiveTask(null);
      setActiveTaskData(null);
      setActiveColumn(null);
      setActiveTaskColumn(null);
      return;
    }
    
    // Check if we're handling a column drag
    if (activeColumn) {
      // Get the column we're dragging over
      const overColumn = columns.find(col => col.id === over.id);
      
      if (overColumn && activeColumn.id !== overColumn.id) {
        // Reorder the columns
        dispatch(columnsActions.reorderColumns({
          activeId: activeColumn.id,
          overId: overColumn.id,
          projectName
        }));
      }
      
      // Reset active column
      setActiveColumn(null);
      return;
    }
    
    // We're handling a task drag
    // First, check if this is a reordering within the same column
    const isTaskReordering = isReorderingWithinSameColumn(active, over);
    
    if (isTaskReordering && activeTaskColumn) {
      // Handle reordering within the same column
      dispatch(taskActions.reorderTasks({
        activeTaskId: active.id,
        overTaskId: over.id,
        columnStatus: activeTaskColumn.status
      }));
      
      console.log(`Reordered task ${active.id} to position of ${over.id} in column ${activeTaskColumn.status}`);
    } else {
      // We're moving a task to a different column
      
      // Find if we're dropping directly on a column or any part of it
      const isOverColumn = columns.some(col => 
        col.status === over.id || 
        col.id === over.id || 
        over.data?.current?.status === col.status ||
        over.data?.current?.columnId === col.id
      );
      
      // Get the target column status
      let targetColumnStatus = null;
      
      if (isOverColumn) {
        // Try to get the column status from various sources
        if (over.data?.current?.status) {
          targetColumnStatus = over.data.current.status;
        } else if (over.data?.current?.columnStatus) {
          // From task data attribute
          targetColumnStatus = over.data.current.columnStatus;
        } else {
          const targetColumn = columns.find(col => 
            col.status === over.id || 
            col.id === over.id || 
            (over.data?.current?.columnId === col.id)
          );
          if (targetColumn) {
            targetColumnStatus = targetColumn.status;
          }
        }
        
        // If we found a valid target column status
        if (targetColumnStatus) {
          // Move the task to the new column
          dispatch(taskActions.moveTask({
            taskId: active.id,
            newStatus: targetColumnStatus
          }));
          
          console.log(`Task ${active.id} moved directly to column ${targetColumnStatus}`);
        }
      } else {
        // Otherwise, we're dropping on another task or droppable area
        // Find the columns containing the task and the drop target
        const activeTaskColumnData = findColumnOfTask(active.id);
        const overColumn = findColumnFromPoint(over.id);
        
        // If we couldn't determine the source or target column, or if they're the same, do nothing
        if (!activeTaskColumnData || !overColumn || activeTaskColumnData.status === overColumn.status) {
          return;
        }
        
        // Move the task to the new column by changing its status
        dispatch(taskActions.moveTask({
          taskId: active.id,
          newStatus: overColumn.status
        }));
        
        console.log(`Task ${active.id} moved to column with status ${overColumn.status}`);
      }
    }
    
    // Reset active states
    setActiveTask(null);
    setActiveTaskData(null);
    setActiveTaskColumn(null);
  };
  
  // Helper to determine if we're reordering within the same column
  const isReorderingWithinSameColumn = (active: any, over: any) => {
    // Get the active task's column status
    const activeColumnStatus = active.data?.current?.columnStatus || 
                               (activeTaskData && activeTaskData.status);
    
    // Get the over task's column status
    const overColumnStatus = over.data?.current?.columnStatus || 
                             over.data?.current?.status;
    
    // If both tasks have the same column status and it's not undefined, it's a reordering
    return activeColumnStatus && 
           overColumnStatus && 
           activeColumnStatus === overColumnStatus;
  };
  
  // Helper to find the column containing a task
  const findColumnOfTask = (taskId: UniqueIdentifier) => {
    const task = tasks.find(t => 
      (t.id?.toString() === taskId.toString()) || (t.title === taskId)
    );
    
    if (!task) return null;
    
    return columns.find(col => col.status === task.status && col.projectName === projectName);
  };
  
  // Helper to find a column from a DOM element ID
  const findColumnFromPoint = (pointerId: UniqueIdentifier) => {
    // First check if the pointerId corresponds to a task
    const task = tasks.find(t => 
      (t.id?.toString() === pointerId.toString()) || (t.title === pointerId)
    );
    
    if (task) {
      return columns.find(col => col.status === task.status && col.projectName === projectName);
    }
    
    // Check various ways to identify a column
    const column = columns.find(col => 
      // By status
      col.status === pointerId || 
      // By ID
      col.id === pointerId
    );
    
    if (column && column.projectName === projectName) {
      return column;
    }
    
    // Handle the case when pointerId has data attached (from dnd-kit)
    if (typeof pointerId === 'object' && pointerId !== null) {
      const pointerData = (pointerId as any).data?.current;
      if (pointerData) {
        return columns.find(col => 
          (pointerData.status === col.status || 
           pointerData.columnStatus === col.status ||
           pointerData.columnId === col.id) && 
          col.projectName === projectName
        );
      }
    }
    
    return null;
  };

  const addColumn = () => {
    dispatch(columnsActions.addColumn({
      id: crypto.randomUUID(), 
      title: columnTitle, 
      projectName: projectName, 
      tasks: [], 
      status: columnTitle
    }));
    setAddColumnClicked(!addColumnClicked);
    setColumnTitle("");
  };
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          width: "100%",
          height: "89vh",
          display: "flex",
          mt: 14,
          mx: 3,
          overflowY: "hidden",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <SortableContext 
          items={projectColumns.map(col => col.id)} 
          strategy={horizontalListSortingStrategy}
        >
          {projectColumns.map((column: Columntype) => (
            <SortableColumn 
              key={column.id}
              id={column.id}  
              column={column} 
              tasks={tasks} 
            />
          ))}
        </SortableContext>

        <Box>
          <Box
            sx={{
              width: "300px",
              backgroundColor: "#EBECF0A5",
              mx: 1,
              p: 2,
              display: "block"
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

      {/* Drag Overlay - This shows a preview of what's being dragged */}
      <DragOverlay dropAnimation={dropAnimation}>
        {activeColumn ? (
          <Box
            sx={{
              minWidth: "300px",
              maxWidth: "300px",
              backgroundColor: "#EBECF0c5",
              mx: 1,
              p: 2,
              boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
              borderRadius: "6px",
              transform: "rotate(3deg)",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              {activeColumn.title}
            </Typography>
          </Box>
        ) : activeTaskData ? (
          <Box
            sx={{
              backgroundColor: "white",
              p: 2,
              borderRadius: "6px",
              boxShadow: "0px 5px 20px rgba(0,0,0,0.3)",
              width: "280px",
              transform: "rotate(2deg) scale(1.02)",
              transition: "transform 0.2s ease",
            }}
          >
            <TaskComponent task={activeTaskData} />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ProjectDashboard;
