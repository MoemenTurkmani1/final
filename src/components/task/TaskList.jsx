import React from 'react';
import { Trash2 } from 'lucide-react';

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div>
                <h3 className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-500'}`}>
                    {task.description}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;