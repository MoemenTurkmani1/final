/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export default function ProductFilter({ 
  onFilter, 
  onSort,
  products,
  loading
}) {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('id-asc');
  const [categories, setCategories] = useState([]);
  
  // Load filters from localStorage on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      setPriceRange({
        min: parsedFilters.priceRange.min || '',
        max: parsedFilters.priceRange.max || ''
      });
      setSelectedCategories(parsedFilters.categories || []);
    }
    
    const savedSort = localStorage.getItem('sortOption');
    if (savedSort) {
      setSortOption(savedSort);
      const [field, direction] = savedSort.split('-');
      onSort?.(field, direction);
    }
  }, [onSort]);
  
  // Extract categories from products
  useEffect(() => {
    if (products && products.length > 0) {
      const extractedCategories = extractUniqueCategories(products);
      setCategories(extractedCategories);
    }
  }, [products]);
  
  // Apply saved filters when products load
  useEffect(() => {
    if (products && products.length > 0) {
      const savedFilters = localStorage.getItem('filters');
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters);
        onFilter?.(parsedFilters);
      }
    }
  }, [products, onFilter]);
  
  const extractUniqueCategories = (productList) => {
    // Use Set to efficiently extract unique categories
    const uniqueCategories = new Set();
    
    productList.forEach(product => {
      if (product.category) {
        // Normalize category name - capitalize first letter
        const categoryName = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        uniqueCategories.add(categoryName);
      }
    });
    
    return Array.from(uniqueCategories).sort();
  };
  
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    
    const [field, direction] = newSortOption.split('-');
    onSort?.(field, direction);
    
    // Save sort preference to localStorage
    localStorage.setItem('sortOption', newSortOption);
  };
  
  const applyFilters = () => {
    const filters = {
      priceRange: {
        min: priceRange.min ? Number(priceRange.min) : null,
        max: priceRange.max ? Number(priceRange.max) : null
      },
      categories: selectedCategories.length > 0 ? selectedCategories : null
    };
    
    onFilter?.(filters);
    
    // Save filters to localStorage
    localStorage.setItem('filters', JSON.stringify(filters));
  };
  
  const resetFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedCategories([]);
    setSortOption('id-asc');
    
    const resetFiltersObj = {
      priceRange: { min: null, max: null },
      categories: null
    };
    
    onFilter?.(resetFiltersObj);
    onSort?.('id', 'asc');
    
    // Clear filters from localStorage
    localStorage.removeItem('filters');
    localStorage.removeItem('sortOption');
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
      
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
        <div className="flex space-x-2">
          <div className="w-1/2">
            <label className="block text-sm text-gray-600 mb-1">Min</label>
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceRangeChange}
              className="w-full p-2 border rounded-md"
              placeholder="Min"
              min="0"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-600 mb-1">Max</label>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceRangeChange}
              className="w-full p-2 border rounded-md"
              placeholder="Max"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
        {loading ? (
          <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
        ) : (
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                  {category}
                </label>
              </div>
            ))}
            {categories.length === 0 && (
              <p className="text-sm text-gray-500">No categories available</p>
            )}
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Sort By</h3>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="id-asc">ID (Low to High)</option>
          <option value="id-desc">ID (High to Low)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="title-asc">Title (A to Z)</option>
          <option value="title-desc">Title (Z to A)</option>
        </select>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}