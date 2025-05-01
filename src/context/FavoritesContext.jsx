/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (product) => {
    setFavorites(prev => [...prev, product]);
  };

  const removeFavorite = (productId) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}