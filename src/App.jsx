import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { TasksProvider } from './context/TasksContext';
import Layout from './components/layout/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Favorites from './pages/Favorites'; 
import TaskManager from './pages/TaskManger';
import Dashboard from './components/dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <TasksProvider>
        <CartProvider>
          <FavoritesProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/task-manager" element={<TaskManager />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Layout>
          </FavoritesProvider>
        </CartProvider>
      </TasksProvider>
    </Router>
  );
}

export default App;
