export type Task = {
    id?: string | number;
    title: string;
    description: string;
    status: string;
    projectName: string;

}

export type Project = {
    title: string,
    tasks?: Task[];
    columns?: Column[];
    
}

export type Column = {
    id: string;
    title: string;
    tasks: Task[];
    projectName: string;
    status: string;
}