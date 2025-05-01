import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, ShoppingBag } from 'lucide-react';
// In a real application, you would import the data directly like this:
// import products from './dataProduct';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    // Load data from the products file
    const fetchData = async () => {
      try {
        // In a real application, you would just use the imported data
        // Since we're simulating the import, we'll read from the file directly
        const dataFile = await window.fs.readFile('paste.txt', { encoding: 'utf8' });
        const products = JSON.parse(dataFile);
        
        // For this example, let's focus on showing product #19 (the one from your example)
        // along with a couple others to demonstrate the grid
        const userFavorites = products.filter(product => 
          [19, 7, 15].includes(product.id)
        );
        
        setFavorites(userFavorites);
        setLoading(false);
      } catch (error) {
        console.error('Error loading favorites:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const addToCart = (product) => {
    // Increment cart count
    setCartItems(cartItems + 1);
    console.log('Added to cart:', product);
    // For a real app, implement your cart logic here
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <p className="text-lg">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Favorites</h1>
        <div className="relative">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
          {cartItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {cartItems}
            </div>
          )}
        </div>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">You don't have any favorites yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative pt-[100%]">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => removeFavorite(product.id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => addToCart(product)}
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;