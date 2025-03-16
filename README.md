# Collaboration Tool

A modern task management dashboard built with React, TypeScript, and Material-UI.

## Overview

This project implements a Kanban-style task management board that allows users to organize tasks across different status columns. The application provides an intuitive drag-and-drop interface for managing tasks, organizing columns, and tracking project progress.

## Features

### Core Features

1. **Project Management**
   - Create multiple projects
   - Navigate between different projects
   - Each project has its own set of columns and tasks

2. **Column Management**
   - **Default columns (Todo, Doing, Done) created automatically for each project**
   - **Automatic column creation ensures every project starts with a consistent structure**
   - Add custom columns to extend the default workflow
   - Delete columns via the column menu
   - Drag to reorder columns

3. **Task Management**
   - Add tasks to any column
   - Move tasks between columns (change status)
   - Reorder tasks within a column
   - Tasks adapt to column width

### Enhanced Drag-and-Drop Functionality

1. **Task Dragging**
   - Drag tasks between columns to change their status
   - Drop tasks anywhere in a column, including the title area
   - Reorder tasks within the same column
   - Visual feedback during dragging operations

2. **Column Dragging**
   - Reorder columns by dragging them
   - Smooth animations during column movement

### UI Improvements

1. **Dynamic Column Heights**
   - Columns adapt height based on content
   - Empty columns appear compact
   - Better visual representation of workload

2. **Scrollbar Management**
   - Hidden vertical scrollbar for cleaner appearance
   - Horizontal scrollbar positioned at the bottom of the page
   - Smooth scrolling behavior

3. **Column Operations**
   - Menu for column actions (accessed via the three dots icon)
   - Delete columns directly from the menu
   - More operations can be added in the future

## Technical Implementation

### Technologies Used

- **React** - Frontend library
- **TypeScript** - Type safety and better developer experience
- **Redux** - State management
- **Material-UI** - Component library and styling
- **@dnd-kit** - Drag-and-drop functionality

### Key Components

1. **ProjectDashboard**
   - Main component that renders the columns and tasks
   - Handles drag-and-drop logic
   - **Ensures default columns (Todo, Doing, Done) exist for every project**

2. **Column & SortableColumn**
   - Renders individual columns
   - Manages column-specific state and actions

3. **Task & SortableItem**
   - Renders individual task cards
   - Provides drag handlers and styling

### Redux Store

The application uses Redux for state management with the following slices:

1. **projectSlice** - Manages project data
2. **columnSlice** - Handles column operations and **creates default columns**
3. **taskSlice** - Controls task creation, movement, and reordering

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   ```

2. Install dependencies
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

## Future Enhancements

- Task details view with description, comments, and attachments
- User authentication and permission controls
- Filtering and searching tasks
- Due dates and priority settings
- Dark mode support
- Mobile-responsive design

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 