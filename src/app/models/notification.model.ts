export interface CustomNotification {
  type: 'status' | 'assignment' | 'deadline'; 
  message: string;
  tasks: any[];
  duration?: number;
}
