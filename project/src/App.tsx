import React, { useState, useEffect } from 'react';
import { Task, TaskFormData } from './types';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { localStorageDB } from './lib/supabase';
import { CheckSquare, PlusCircle } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    // Load tasks from local storage on component mount
    const fetchTasks = async () => {
      const { data } = await localStorageDB.getTasks();
      setTasks(data || []);
    };
    
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    await localStorageDB.addTask(newTask);
    setTasks(prev => [...prev, newTask]);
    setIsFormOpen(false);
  };

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (!editingTask) return;
    
    const updatedTask: Task = {
      ...editingTask,
      ...taskData,
    };
    
    await localStorageDB.updateTask(updatedTask);
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(null);
  };

  const handleToggleComplete = async (id: string) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) return;
    
    const updatedTask: Task = {
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
    };
    
    await localStorageDB.updateTask(updatedTask);
    setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
  };

  const handleDeleteTask = async (id: string) => {
    await localStorageDB.deleteTask(id);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <CheckSquare className="h-8 w-8 mr-2 text-blue-500" />
              Task Manager
            </h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Task
            </button>
          </div>
        </header>

        <main className="space-y-6">
          {(isFormOpen || editingTask) && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h2>
              <TaskForm
                onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                initialData={editingTask || undefined}
                onCancel={handleCancelForm}
              />
            </div>
          )}

          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Task Manager App &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;