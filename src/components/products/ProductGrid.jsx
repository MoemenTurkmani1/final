/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import ProductSearch from './ProductSearch';
import { ShoppingCart, X, Trash2 } from 'lucide-react';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: { min: null, max: null },
    categories: null
  });
  const [sortConfig, setSortConfig] = useState({ field: 'id', direction: 'asc' });
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load products, favorites, and cart from localStorage
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // First try to get products from localStorage
        const cachedProducts = localStorage.getItem('products');
        let productData;
        
        if (cachedProducts) {
          productData = JSON.parse(cachedProducts);
          console.log('Products loaded from localStorage');
        } else {
          // If not available in localStorage, fetch from API
          const response = await fetch('https://fakestoreapi.com/products');
          productData = await response.json();
          
          // Cache the products in localStorage
          localStorage.setItem('products', JSON.stringify(productData));
          console.log('Products fetched from API and cached');
        }
        
        setProducts(productData);
        setFilteredProducts(productData);
        
        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
        
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to load products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    if (!products.length) return;
    
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price range filter
    if (filters.priceRange.min !== null) {
      result = result.filter(product => product.price >= filters.priceRange.min);
    }
    if (filters.priceRange.max !== null) {
      result = result.filter(product => product.price <= filters.priceRange.max);
    }
    
    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(product => {
        const productCategory = product.category.toLowerCase();
        return filters.categories.some(cat => 
          productCategory.includes(cat.toLowerCase())
        );
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const fieldA = a[sortConfig.field];
      const fieldB = b[sortConfig.field];
      
      if (fieldA < fieldB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredProducts(result);
  }, [products, searchTerm, filters, sortConfig]);

  const handleToggleFavorite = (productId) => {
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleAddToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    let updatedCart;
    
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      updatedCart = cart.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      // Add new item to cart
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSort = (field, direction) => {
    setSortConfig({ field, direction });
  };
  
  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return <div className="text-center py-8">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
      <p className="mt-4">Loading products...</p>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Cart */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Shop</h1>
        <div className="relative">
          <button 
            className="p-2 rounded-full bg-blue-50 text-blue-600 relative"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          
          {/* Mini Cart */}
          {isCartOpen && (
            <div className="absolute right-0 top-10 w-80 bg-white shadow-lg rounded-lg z-10 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Your Cart</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                <>
                  <div className="max-h-60 overflow-y-auto mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-2 py-2 border-b">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-12 h-12 object-contain"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          <div className="flex items-center mt-1">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-gray-700 w-6 h-6 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="mx-2 text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-gray-700 w-6 h-6 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <button 
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 mt-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <button 
                      className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <ProductSearch onSearch={setSearchTerm} />
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilter 
            onFilter={handleFilter}
            onSort={handleSort}
            products={products}
            loading={loading}
          />
        </div>
        
        <div className="w-full md:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}