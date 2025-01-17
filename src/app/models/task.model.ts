export interface Task {
    id: string,
    title: string,
    description: string,
    deadline: Date,
    priority: string,
    status: string,
    category: string,
    assignedTo: string,
    createdBy: string,
    isUserNotified: boolean,
    statusHasChanged: boolean
}