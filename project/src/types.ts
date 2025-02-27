export type Category = 'Work' | 'Personal' | 'Urgent' | 'Other';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: Category;
  dueDate: string;
}