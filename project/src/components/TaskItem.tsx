import React from 'react';
import { Task } from '../types';
import { format } from 'date-fns';
import { CheckCircle, Circle, Edit, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Work':
      return 'bg-blue-100 text-blue-800';
    case 'Personal':
      return 'bg-green-100 text-green-800';
    case 'Urgent':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
  const formattedDate = format(new Date(task.dueDate), 'MMM dd, yyyy');
  const categoryClass = getCategoryColor(task.category);

  return (
    <div className={`border rounded-lg p-4 mb-3 shadow-sm ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button 
            onClick={() => onToggleComplete(task.id)}
            className="mt-1 text-blue-500 hover:text-blue-700"
          >
            {task.completed ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
          
          <div className="flex-1">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${categoryClass}`}>
                {task.category}
              </span>
              
              <span className={`text-xs ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                {isOverdue ? 'Overdue: ' : 'Due: '}{formattedDate}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-blue-500"
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-500"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;