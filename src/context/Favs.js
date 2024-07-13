import { createContext, useState, useEffect } from 'react';

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favItems, setFavItems] = useState(
    localStorage.getItem('favItems')
      ? JSON.parse(localStorage.getItem('favItems'))
      : []
  );

  const addToFav = (item) => {
    const isItemInFav = favItems.find((favItem) => favItem.id === item.id);
    if (!isItemInFav) {
      setFavItems([...favItems, item]);
    }
  };

  const removeFromFav = (item) => {
    setFavItems(favItems.filter((favItem) => favItem.id !== item.id));
  };

  const clearCart = () => {
    setFavItems([]);
  };

  useEffect(() => {
    localStorage.setItem('favItems', JSON.stringify(favItems));
  }, [favItems]);

  useEffect(() => {
    const favItems = localStorage.getItem('favItems');
    if (favItems) {
      setFavItems(JSON.parse(favItems));
    }
  }, []);

  return (
    <FavContext.Provider
      value={{
        favItems,
        addToFav,
        removeFromFav,
        clearCart,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};
