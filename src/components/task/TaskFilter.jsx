import React from 'react';

const TaskFilter = ({ currentFilter, setFilter }) => {
  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
      <button
        className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'incomplete' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setFilter('incomplete')}
      >
        Incomplete
      </button>
    </div>
  );
};

export default TaskFilter;