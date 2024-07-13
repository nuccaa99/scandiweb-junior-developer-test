import React from 'react';
import './styles/style.css';
import Header from './components/Header/Header';
import AppRoutes from './AppRoutes';

import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/Cart';

import { GET_CATEGORIES } from './Query';
import { useQuery } from '@apollo/client';

import { ColorRing } from 'react-loader-spinner';
import { FavProvider } from './context/Favs';

function App() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading)
    return (
      <div className="loader_container">
        <ColorRing
          className="loader"
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  if (error) return <p>Error</p>;

  return (
    <div className="App">
      <CurrencyProvider>
        <CartProvider>
          <FavProvider>
            <Header categories={data.categories} />
            <AppRoutes initialCategory={data.categories[0].name} />
          </FavProvider>
        </CartProvider>
      </CurrencyProvider>
    </div>
  );
}

export default App;
