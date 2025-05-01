// Header.jsx
import { Home, CheckSquare, Package, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom"; 

export default function Header() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-indigo-500 text-gray-900"
            >
              <Home className="w-5 h-5 mr-1" />
              Dashboard
            </Link>

            <Link
              to="/tasks"
              className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <CheckSquare className="w-5 h-5 mr-1" />
              Tasks
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <Package className="w-5 h-5 mr-1" />
              Products
            </Link>

            <Link
              to="/favorites"
              className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <Heart className="w-5 h-5 mr-1" />
              Favorites
            </Link>

            <Link
              to="/cart"
              className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <ShoppingCart className="w-5 h-5 mr-1" />
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
