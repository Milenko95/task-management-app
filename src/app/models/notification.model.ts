export interface CustomNotification {
  type: 'status' | 'assignment'; 
  message: string;
  tasks: any[];
  duration?: number;
}
