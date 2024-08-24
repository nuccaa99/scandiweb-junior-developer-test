import { createContext, useState, useEffect } from 'react';

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favItems, setFavItems] = useState(
    sessionStorage.getItem('favItems')
      ? JSON.parse(sessionStorage.getItem('favItems'))
      : []
  );

  const isFav = (itemId) => {
    return favItems.some((favItem) => favItem.id === itemId);
  };

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
    sessionStorage.setItem('favItems', JSON.stringify(favItems));
  }, [favItems]);

  useEffect(() => {
    const favItems = sessionStorage.getItem('favItems');
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
        isFav,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};
