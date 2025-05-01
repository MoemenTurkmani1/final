// Home.jsx
import { CheckSquare, Package } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Link
          to="/tasks"
          className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-center flex-col text-center">
            <CheckSquare className="w-16 h-16 text-indigo-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Manager</h2>
            <p className="text-gray-600">Manage your daily tasks and stay organized</p>
          </div>
        </Link>

        <Link
          to="/products"
          className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-center flex-col text-center">
            <Package className="w-16 h-16 text-indigo-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Products</h2>
            <p className="text-gray-600">Browse our collection of amazing products</p>
          </div>
        </Link>
      </div>
  
  );
}
