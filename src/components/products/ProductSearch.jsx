import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const ProductSearch = ({ onSearch, initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  
  // Load previous search term from localStorage
  useEffect(() => {
    const savedSearch = localStorage.getItem('searchTerm');
    if (savedSearch) {
      setSearchTerm(savedSearch);
      handleSearch(savedSearch);
    }
  }, []);

  const handleSearch = (term = searchTerm) => {
    const searchValue = term.trim();
    onSearch(searchValue);
    localStorage.setItem('searchTerm', searchValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleClear = () => {
    setSearchTerm('');
    handleSearch('');
  };
  
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          className="w-full p-3 pl-10 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        {searchTerm && (
          <button
            type="button"
            className="absolute inset-y-0 right-12 flex items-center pr-3"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
        
        <button
          onClick={() => handleSearch()}
          className="absolute inset-y-0 right-0 flex items-center px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ProductSearch;