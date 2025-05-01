/* eslint-disable react/prop-types */
import React from "react";
import ProductGrid from "../components/products/ProductGrid";
import ProductFilter from "../components/products/ProductFilter";
import ProductSearch from "../components/products/ProductSearch";

// --- React Component ---
export default function Products() {
  return (
    <div className="p-4" dir="rtl">
      <ProductSearch />
      <ProductFilter />
      <ProductGrid />
    </div>
  );
}

// --- Utility Functions ---

export const loadProducts = async () => {
  try {
    const data = await window.fs.readFile('paste.txt', { encoding: 'utf8' });
    const products = JSON.parse(data);
    return products;
  } catch (error) {
    console.error("Error loading product data:", error);
    return [];
  }
};

export const formatCurrency = (price, currency = 'ر.س') => {
  return `${currency} ${price.toFixed(2)}`;
};

export const findProductById = (products, id) => {
  return products.find(product => product.id === id) || null;
};

export const filterBySearchTerm = (products, term) => {
  if (!term) return products;

  const searchTerm = term.toLowerCase();
  return products.filter(product =>
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

export const filterByPriceRange = (products, min, max) => {
  return products.filter(product =>
    (min === null || product.price >= min) &&
    (max === null || product.price <= max)
  );
};

export const sortProducts = (products, sortBy = 'id', direction = 'asc') => {
  const sortedProducts = [...products];

  sortedProducts.sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'price') {
      comparison = a.price - b.price;
    } else if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else {
      comparison = a.id - b.id;
    }

    return direction === 'asc' ? comparison : -comparison;
  });

  return sortedProducts;
};

export const extractCategories = (products) => {
  const categories = products.map(product => {
    const title = product.title.toLowerCase();

    if (title.includes('jacket') || title.includes('shirt') || title.includes('clothing')) {
      return 'Clothing';
    } else if (title.includes('gold') || title.includes('silver') || title.includes('bracelet')) {
      return 'Jewelry';
    } else if (title.includes('hard drive') || title.includes('ssd') || title.includes('monitor')) {
      return 'Electronics';
    } else if (title.includes('backpack') || title.includes('bag')) {
      return 'Accessories';
    } else {
      return 'Other';
    }
  });

  return [...new Set(categories)].sort();
};

// --- Cart Functions ---

export const addToCart = (cart, product, quantity = 1) => {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    return cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    return [...cart, { ...product, quantity }];
  }
};

export const removeFromCart = (cart, productId) => {
  return cart.filter(item => item.id !== productId);
};

export const updateCartQuantity = (cart, productId, quantity) => {
  return cart.map(item =>
    item.id === productId ? { ...item, quantity } : item
  );
};

export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// --- Favorites Functions ---

export const toggleFavorite = (favorites, productId) => {
  if (favorites.includes(productId)) {
    return favorites.filter(id => id !== productId);
  } else {
    return [...favorites, productId];
  }
};

export const isFavorite = (favorites, productId) => {
  return favorites.includes(productId);
};
