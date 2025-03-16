import { Box, Container, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../redux/store'
import { projectActions } from '../redux/slices/projectSlice'
import { columnsActions } from '../redux/slices/columnSlice'
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
    const projects = useSelector((state: RootState) => state.projects.projects)
    const columns = useSelector((state: RootState) => state.columns.columns)
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');

    // Function to create a new project with default columns
    const createNewProject = () => {
        if (newProjectName.trim() === '') return;
        
        // Create the project
        dispatch(projectActions.addProject({ title: newProjectName.trim() }));
        
        // Add default columns for this project
        dispatch(columnsActions.addDefaultColumns(newProjectName.trim()));
        
        // Reset state and close dialog
        setNewProjectName('');
        setDialogOpen(false);
    };

    return (
        <Container sx={{ mt: 14, display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {
                projects?.map((project, index) =>
                    <Box 
                        key={index}
                        sx={{
                            backgroundColor: "rgba(255,255,255,0.8)", 
                            width: "300px", 
                            height: "150px",
                            borderRadius: "8px",
                            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                            display: "flex", 
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)"
                            }
                        }} 
                        onClick={() => {
                            nav(`/projects/${project.title}`)
                        }}
                    >
                        <h1>{project.title}</h1>
                    </Box>
                )
            }
            
            {/* New Project Button */}
            <Box 
                sx={{
                    backgroundColor: "rgba(230,230,230,0.8)", 
                    width: "300px", 
                    height: "150px",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                    display: "flex", 
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        backgroundColor: "rgba(240,240,240,0.9)"
                    }
                }} 
                onClick={() => setDialogOpen(true)}
            >
                <AddIcon sx={{ fontSize: 50, color: "#666" }} />
                <p>New Project</p>
            </Box>

            {/* Dialog for New Project */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Project Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={createNewProject} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default Dashboard