import { ClipboardList } from 'lucide-react';
import TaskForm from '../components/task/TaskForm';
import TaskList from '../components/task/TaskList';
import TaskFilter from '../components/task/TaskFilter';

export default function TaskManager() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardList className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
      </div>
      <TaskForm />
      <TaskFilter />
      <TaskList />
    </div>
  );
}
