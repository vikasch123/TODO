import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Note: In a real application, these would be environment variables
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';

// For this demo, we'll use localStorage instead of Supabase
// This is just a placeholder for the actual Supabase implementation
export const supabase = createClient(supabaseUrl, supabaseKey);

// Local storage implementation for demo purposes
export const localStorageDB = {
  async getTasks() {
    const tasks = localStorage.getItem('tasks');
    return { data: tasks ? JSON.parse(tasks) : [] };
  },
  
  async addTask(task: any) {
    const { data } = await this.getTasks();
    const newTasks = [...data, task];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { data: task };
  },
  
  async updateTask(task: any) {
    const { data } = await this.getTasks();
    const newTasks = data.map((t: any) => t.id === task.id ? task : t);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { data: task };
  },
  
  async deleteTask(id: string) {
    const { data } = await this.getTasks();
    const newTasks = data.filter((t: any) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { data: null };
  }
};