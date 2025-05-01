/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleFavorite,
  isFavorite 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-contain p-4 bg-white"
        />
        <button
          onClick={() => onToggleFavorite(product.id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
            <button
              onClick={() => onAddToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">{product.rating?.rate || 0} ★</span>
        </div>
      </div>
    </div>
  );
}