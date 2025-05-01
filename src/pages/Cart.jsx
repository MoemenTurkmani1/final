import { useState, useEffect } from "react";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    // Read and parse the product data from the uploaded file
    const readProductData = async () => {
      try {
        const fileContent = await window.fs.readFile("paste.txt", { encoding: "utf8" });
        const parsedData = JSON.parse(fileContent);
        setProducts(parsedData);
        
        // Initially add item #19 to cart
        const initialCartItem = parsedData.find(item => item.id === 19);
        if (initialCartItem) {
          setCart([initialCartItem]);
        }
      } catch (error) {
        console.error("Error reading product data:", error);
      }
    };
    
    readProductData();
  }, []);

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // In a real app, this would integrate with WhatsApp or another service
    alert(`Processing checkout for ${name} with total $${calculateTotal()}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="block w-8 h-8 text-gray-400">🛒</span>
            </div>
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                  onClick={() => removeFromCart(item.id)}
                >
                  <span className="block w-5 h-5">🗑️</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="border-t pt-4">
            <div className="text-xl font-bold text-gray-900 mb-4">
              Total: ${calculateTotal()}
            </div>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              onClick={handleCheckout}
            >
              <span className="block w-5 h-5">📤</span>
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;